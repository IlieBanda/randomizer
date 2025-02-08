document.addEventListener('DOMContentLoaded', () => {
    const minInput = document.getElementById('min');
    const maxInput = document.getElementById('max');
    const generateBtn = document.getElementById('generate');
    const resultElement = document.getElementById('result');
    const copyBtn = document.getElementById('copy');

    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const html = document.documentElement;

    const translations = {
        ru: {
            title: 'Генератор случайных чисел',
            minLabel: 'Минимальное значение:',
            maxLabel: 'Максимальное значение:',
            generateBtn: 'Сгенерировать число',
            copyBtn: 'Копировать',
            copied: 'Скопировано!',
            errorInvalidNumbers: 'Пожалуйста, введите корректные числа',
            errorMinMax: 'Минимальное значение не может быть больше максимального',
            errorCopy: 'Не удалось скопировать число'
        },
        en: {
            title: 'Random Number Generator',
            minLabel: 'Minimum value:',
            maxLabel: 'Maximum value:',
            generateBtn: 'Generate number',
            copyBtn: 'Copy',
            copied: 'Copied!',
            errorInvalidNumbers: 'Please enter valid numbers',
            errorMinMax: 'Minimum value cannot be greater than maximum',
            errorCopy: 'Failed to copy number'
        }
    };

    let currentLang = 'ru';

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Theme handling
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Language handling
    function updateTexts() {
        document.title = translations[currentLang].title;
        document.querySelector('h1').textContent = translations[currentLang].title;
        document.querySelector('label[for="min"]').textContent = translations[currentLang].minLabel;
        document.querySelector('label[for="max"]').textContent = translations[currentLang].maxLabel;
        generateBtn.textContent = translations[currentLang].generateBtn;
        document.querySelector('.copy-text').textContent = translations[currentLang].copyBtn;
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('lang', currentLang);
        updateTexts();
    });

    function initLang() {
        currentLang = localStorage.getItem('lang') || 'ru';
        html.setAttribute('lang', currentLang);
        updateTexts();
    }

    function updateResult() {
        const min = parseInt(minInput.value);
        const max = parseInt(maxInput.value);

        if (isNaN(min) || isNaN(max)) {
            alert(translations[currentLang].errorInvalidNumbers);
            return;
        }

        if (min > max) {
            alert(translations[currentLang].errorMinMax);
            return;
        }

        const randomNumber = generateRandomNumber(min, max);
        resultElement.textContent = randomNumber;
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(resultElement.textContent);
            const copyBtn = document.querySelector('.copy-text');
            copyBtn.textContent = translations[currentLang].copied;
            setTimeout(() => {
                copyBtn.textContent = translations[currentLang].copyBtn;
            }, 2000);
        } catch (err) {
            alert(translations[currentLang].errorCopy);
        }
    }

    // Initialize theme and language
    initTheme();
    initLang();

    generateBtn.addEventListener('click', updateResult);
    copyBtn.addEventListener('click', copyToClipboard);
}); 