package com.example;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class ReactAppSeleniumTest {
    private WebDriver driver;
    private By firstMatchBy = By.xpath("(//p[contains(@class, 'MuiTypography-body1')])[2]");
    private By selectLeagueBy = By.id("demo-simple-select");
    private By firstMatchCheckBoxBy = By.xpath("(//input[@id='box'])[1]");

    @BeforeClass
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);
        driver.get("http://localhost:3000");
    }

    @Test
    public void testTitle() {
        String actualTitle = driver.getTitle();
        String expectedTitle = "Soccer Profit";
        Assert.assertEquals(actualTitle, expectedTitle, "Title mismatch");
    }

    @Test
    public void testSecondParaText() {
        WebElement secondParaElement = driver.findElement(firstMatchBy);
        String actualParagraphText = secondParaElement.getText().replace("*", "");
        String expectedParagraphText = "TeamA1 vs TeamB1";
        Assert.assertEquals(actualParagraphText, expectedParagraphText, "Paragraph text mismatch");
    }

    @Test
    public void testSecondParaText2() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement secondParaElement = wait.until(ExpectedConditions.visibilityOfElementLocated(firstMatchBy));

        // Assert.assertTrue(secondParaElement.isDisplayed());
        String actualParagraphText = secondParaElement.getText().replace("*", "");
        String expectedParagraphText = "TeamA1 vs TeamB1";
        Assert.assertEquals(actualParagraphText, expectedParagraphText, "Paragraph text mismatch");
    }

    @Test
    public void testSecondButtonText() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement buttonElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//button)[2]")));
        // Assert.assertTrue(buttonElement.isDisplayed());
        String actualButtonText = buttonElement.getText();
        String expectedButtonText = "BET";
        Assert.assertEquals(actualButtonText, expectedButtonText, "Button text mismatch");
    }

    @Test
    public void testDropdown() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement dropdownElement = wait.until(ExpectedConditions.visibilityOfElementLocated(selectLeagueBy));
        // Assert.assertTrue(dropdownElement.isDisplayed());
        String actualDrodownText = dropdownElement.getText();
        String expectedDropdownText = "UK League 1";
        Assert.assertEquals(actualDrodownText, expectedDropdownText, "Dropdown text mismatch");
    }

    @Test
    public void testDropdownSelect() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement dropdownElement = wait.until(ExpectedConditions.visibilityOfElementLocated(selectLeagueBy));
        dropdownElement.click();
        WebElement optionElement = driver.findElement(By.xpath("//li[text()='UK League 2']"));
        optionElement.click();
        WebElement secondParaElement = wait.until(ExpectedConditions.visibilityOfElementLocated(firstMatchBy));
        String actualParagraphText = secondParaElement.getText();
        String expectedParagraphText = "TeamA11 vs TeamB11";
        Assert.assertEquals(actualParagraphText, expectedParagraphText, "Paragraph text mismatch");
        dropdownElement.click();
        optionElement = driver.findElement(By.xpath("//li[text()='UK League 1']"));
        optionElement.click();
        secondParaElement = wait.until(ExpectedConditions.visibilityOfElementLocated(firstMatchBy));
        actualParagraphText = secondParaElement.getText().replace("*", "");
        expectedParagraphText = "TeamA1 vs TeamB1";
        Assert.assertEquals(actualParagraphText, expectedParagraphText, "Paragraph text mismatch");
    }

    @Test
    public void testCheckBoxStake() {
        WebDriverWait wait = new WebDriverWait(driver, 2);
        // Retrieve default stake value
        WebElement defaultStakeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//input[@id='stake'])[1]")));
        String defaultStake = defaultStakeElement.getAttribute("value");
        // Verify that 1st match stake = 0
        WebElement initialStakeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//input[@id='stake'])[2]")));
        String initialStake = initialStakeElement.getAttribute("value");
        Assert.assertEquals(initialStake, "0", "Values mismatch");
        // Tick the checkbox of 1st match
        WebElement checkBoxElement = wait.until(ExpectedConditions.presenceOfElementLocated(firstMatchCheckBoxBy));
        checkBoxElement.click();
        // Verify that 1st match stake = default stake
        WebElement changedStakeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//input[@id='stake'])[2]")));
        String changedStake = changedStakeElement.getAttribute("value");
        Assert.assertEquals(changedStake, defaultStake, "Values mismatch");
    }

    @Test
    public void testCheckBoxStep() {
        WebDriverWait wait = new WebDriverWait(driver, 2);

        // retrieve default step value
        WebElement defaultStepElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//input[@id=':r5:'])[1]")));
        String initialDefaultStep = defaultStepElement.getAttribute("value");

        // increase default step value by 1
        int changedDefaultStepInt = Integer.parseInt(initialDefaultStep) + 1;
        String changedDefaultStep = String.valueOf(changedDefaultStepInt);

        // defaultStepElement.clear();
        defaultStepElement.sendKeys(Keys.BACK_SPACE);

        wait.until(ExpectedConditions.attributeToBe(
                By.xpath("(//input[@id=':r5:'])[1]"), "value", "0"));

        defaultStepElement.sendKeys(changedDefaultStep);

        wait.until(ExpectedConditions.attributeToBe(
                By.xpath("(//input[@id=':r5:'])[1]"), "value", changedDefaultStep));

        // tick the checkbox of 1st match
        WebElement checkBoxElement = wait.until(ExpectedConditions.presenceOfElementLocated(firstMatchCheckBoxBy));
        checkBoxElement.click();

        // verify that 1st match step = default step
        WebElement matchStepElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//input[@id=':rd:'])[1]")));
        String changedMatchStep = matchStepElement.getAttribute("value");
        Assert.assertEquals(changedMatchStep, changedDefaultStep,
                "Values of default and 1st match step mismatch");
    }

    @Test
    public void testBetButton() {
        WebDriverWait wait = new WebDriverWait(driver, 2);

        // count asterisks in the name of 1st match
        WebElement firstMatchElement = driver.findElement(firstMatchBy);
        String firstMatchInitialText = firstMatchElement.getText();

        int initialStars = 0;
        for (char ch : firstMatchInitialText.toCharArray()) {
            if (ch == '*') {
                initialStars++;
            }
        }

        // tick the checkbox of 1st match
        WebElement checkBoxElement = wait.until(ExpectedConditions.presenceOfElementLocated(firstMatchCheckBoxBy));
        checkBoxElement.click();

        // click the Bet button
        WebElement buttonElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//button)[2]")));
        buttonElement.click();

        // press f5
        driver.navigate().refresh();

        // count asterisks in the name of 1st match
        firstMatchElement = wait.until(ExpectedConditions.visibilityOfElementLocated(firstMatchBy));

        String firstMatchFinalText = firstMatchElement.getText();

        int finalStars = 0;
        for (char ch : firstMatchFinalText.toCharArray()) {
            if (ch == '*') {
                finalStars++;
            }
        }

        // verify that 1st match contains an additional asterisk
        Assert.assertEquals(finalStars, initialStars + 1,
                "Asterisk dysfunction");
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
            driver = null;
        }
    }
}
