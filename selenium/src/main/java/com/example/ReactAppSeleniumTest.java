package com.example;

import org.openqa.selenium.By;
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
        WebElement secondParaElement = driver.findElements(By.className("MuiTypography-body1")).get(1);
        String actualParagraphText = secondParaElement.getText();
        String expectedParagraphText = "TeamA1 vs TeamB1";
        Assert.assertEquals(actualParagraphText, expectedParagraphText, "Paragraph text mismatch");
    }

    @Test
    public void testSecondParaText2() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement secondParaElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//p[@class='MuiTypography-root MuiTypography-body1 css-o0xjlm-MuiTypography-root'])[2]")));
        // Assert.assertTrue(secondParaElement.isDisplayed());
        String actualParagraphText = secondParaElement.getText();
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
        WebElement dropdownElement = wait
                .until(ExpectedConditions.visibilityOfElementLocated(By.id("demo-simple-select")));
        // Assert.assertTrue(dropdownElement.isDisplayed());
        String actualDrodownText = dropdownElement.getText();
        String expectedDropdownText = "UK League 1";
        Assert.assertEquals(actualDrodownText, expectedDropdownText, "Dropdown text mismatch");
    }

    @Test
    public void testDropdownSelect() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement dropdownElement = wait
                .until(ExpectedConditions.visibilityOfElementLocated(By.id("demo-simple-select")));
        dropdownElement.click();
        WebElement optionElement = driver.findElement(By.xpath("//li[text()='UK League 2']"));
        optionElement.click();
        WebElement secondParaElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//p[contains(@class, 'MuiTypography-body1')])[2]")));
        String actualParagraphText = secondParaElement.getText();
        String expectedParagraphText = "TeamA11 vs TeamB11";
        Assert.assertEquals(actualParagraphText, expectedParagraphText, "Paragraph text mismatch");
        dropdownElement.click();
        optionElement = driver.findElement(By.xpath("//li[text()='UK League 1']"));
        optionElement.click();
        secondParaElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//p[contains(@class, 'MuiTypography-body1')])[2]")));
        actualParagraphText = secondParaElement.getText();
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
        WebElement checkBoxElement = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("(//input[@id='box'])[1]")));
        checkBoxElement.click();
        // Verify that 1st match stake = default stake
        WebElement changedStakeElement = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("(//input[@id='stake'])[2]")));
        String changedStake = changedStakeElement.getAttribute("value");
        Assert.assertEquals(changedStake, defaultStake, "Values mismatch");
    }

    /*
     * @Test
     * public void testCheckBoxStep() {
     * WebDriverWait wait = new WebDriverWait(driver, 2);
     * // Retrieve default step value
     * WebElement defaultStepElement =
     * wait.until(ExpectedConditions.visibilityOfElementLocated(
     * By.xpath("(//input[@id=':r5:'])[1]")));
     * String initialDefaultStep = defaultStepElement.getAttribute("value");
     * System.out.println("initialDefaultStep:" + initialDefaultStep);
     * 
     * // Increase default step value by 1
     * int changedDefaultStepInt = Integer.parseInt(initialDefaultStep) + 1;
     * System.out.println("changedDefaultStepInt:" + changedDefaultStepInt);
     * String changedDefaultStep = String.valueOf(changedDefaultStepInt);
     * System.out.println("changedDefaultStep:" + changedDefaultStep);
     * 
     * defaultStepElement.clear();
     * 
     * wait.until(ExpectedConditions.textToBePresentInElementValue(
     * By.xpath("(//input[@id=':r5:'])[1]"), ""));
     * 
     * System.out.println("defaultStepElement after Clear:" +
     * defaultStepElement.getAttribute("value"));
     * 
     * defaultStepElement.sendKeys(changedDefaultStep);
     * 
     * wait.until(ExpectedConditions.attributeToBe(
     * By.xpath("(//input[@id=':r5:'])[1]"), "value", changedDefaultStep));
     * 
     * System.out.println("defaultStepElement after sendKeys:" +
     * defaultStepElement.getAttribute("value"));
     * 
     * // Tick the checkbox of 1st match
     * WebElement checkBoxElement =
     * wait.until(ExpectedConditions.presenceOfElementLocated(
     * By.xpath("(//input[@id='box'])[1]")));
     * checkBoxElement.click();
     * 
     * // Verify that 1st match step = default step
     * WebElement matchStepElement =
     * wait.until(ExpectedConditions.visibilityOfElementLocated(
     * By.xpath("(//input[@id=':rd:'])[1]")));
     * String changedMatchStep = matchStepElement.getAttribute("value");
     * Assert.assertEquals(changedMatchStep, changedDefaultStep,
     * "Values of default amnd 1st match step mismatch");
     * }
     */
    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
