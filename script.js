// 定义API密钥 - 请替换为您自己的有效API密钥
// 您可以在 https://openweathermap.org/api 免费注册获取
const apiKey = '23181167dfbfe77b8616fe03b8aef05c'; // 请将此处替换为您的真实API密钥

// Google Gemini API配置（免费使用）
// 您可以在 https://aistudio.google.com/app/apikey 获取免费的API密钥
// 支持的模型：gemini-1.5-flash, gemini-1.5-pro, gemini-pro 等
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const GEMINI_API_KEY = 'AIzaSyBt9JdCdchVeTEACvoAzUkxq5uAfbXtdVQ'; // 请替换为您的Google AI Studio API密钥
const GEMINI_MODEL = 'gemini-1.5-flash'; // 免费模型，适合旅游推荐

// 备用模型（如果主要模型不可用）
const BACKUP_MODELS = [
    'gemini-1.5-pro',
    'gemini-pro'
];

// 全局变量存储当前天气数据
let currentWeatherData = null;
let currentCityName = null;

// 日志函数
function log(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    
    // 更新调试信息显示
    const debugInfo = document.getElementById('debug-info');
    if (debugInfo) {
        // 添加新消息到顶部
        const newLine = document.createElement('div');
        newLine.textContent = logMessage;
        debugInfo.insertBefore(newLine, debugInfo.firstChild);
        
        // 限制显示的消息数量
        while (debugInfo.childElementCount > 50) {
            debugInfo.removeChild(debugInfo.lastChild);
        }
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    log('页面加载完成');
    
    // 获取DOM元素
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const testApiBtn = document.getElementById('test-api-btn');
    const weatherInfo = document.getElementById('weather-info');
    const debugBtn = document.getElementById('debug-btn');
    const debugInfo = document.getElementById('debug-info');
    const getRecommendationsBtn = document.getElementById('get-recommendations-btn');
    const recommendationsInfo = document.getElementById('recommendations-info');
    const recommendationsContent = document.getElementById('recommendations-content');
    
    // 检查DOM元素是否存在
    log(`城市输入框元素: ${cityInput ? '已找到' : '未找到'}`);
    log(`搜索按钮元素: ${searchBtn ? '已找到' : '未找到'}`);
    log(`测试API按钮元素: ${testApiBtn ? '已找到' : '未找到'}`);
    log(`天气信息元素: ${weatherInfo ? '已找到' : '未找到'}`);
    log(`调试按钮元素: ${debugBtn ? '已找到' : '未找到'}`);
    log(`调试信息元素: ${debugInfo ? '已找到' : '未找到'}`);
    log(`推荐按钮元素: ${getRecommendationsBtn ? '已找到' : '未找到'}`);
    log(`推荐信息元素: ${recommendationsInfo ? '已找到' : '未找到'}`);
    log(`推荐内容元素: ${recommendationsContent ? '已找到' : '未找到'}`);
    
    // 绑定调试按钮事件
    if (debugBtn && debugInfo) {
        log('绑定调试按钮事件');
        debugBtn.addEventListener('click', () => {
            log('调试按钮被点击');
            if (debugInfo.style.display === 'block' || debugInfo.style.display === '') {
                debugInfo.style.display = 'none';
                debugBtn.textContent = '显示调试信息';
            } else {
                debugInfo.style.display = 'block';
                debugBtn.textContent = '隐藏调试信息';
            }
        });
    }
    
    // 绑定搜索按钮事件
    if (searchBtn && cityInput) {
        log('绑定搜索按钮事件');
        searchBtn.addEventListener('click', () => {
            log('搜索按钮被点击');
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            } else {
                showError('请输入城市名称');
            }
        });
    }
    
    // 绑定回车键事件
    if (cityInput) {
        log('绑定回车键事件');
        cityInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                log('检测到回车键');
                const city = cityInput.value.trim();
                if (city) {
                    getWeather(city);
                } else {
                    showError('请输入城市名称');
                }
            }
        });
    }
    
    // 绑定测试API按钮事件
    if (testApiBtn) {
        log('绑定测试API按钮事件');
        testApiBtn.addEventListener('click', () => {
            log('测试API按钮被点击');
            // 优先使用输入框中的城市，如果为空则使用北京作为测试
            const city = cityInput.value.trim() || 'Beijing';
            log(`测试API使用城市: ${city}`);
            getWeather(city);
        });
    }
    
    // 绑定推荐按钮事件
    if (getRecommendationsBtn) {
        log('绑定推荐按钮事件');
        getRecommendationsBtn.addEventListener('click', () => {
            log('推荐按钮被点击');
            if (currentWeatherData && currentCityName) {
                getAIRecommendations(currentCityName, currentWeatherData);
            } else {
                showError('请先查询天气信息');
            }
        });
    }
    
    log('所有事件监听器已设置');
    
    // 获取天气数据函数
    function getWeather(city) {
        log(`获取天气数据: ${city}`);
        weatherInfo.innerHTML = '<div class="placeholder-text">正在获取天气数据...</div>';
        
        // 首先检查网络连接
        checkNetworkConnection().then(isOnline => {
            if (!isOnline) {
                log('网络连接检查失败');
                showError('网络连接异常，请检查您的网络设置');
                return;
            }
            
            // 构建API URL
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`;
            log(`API URL: ${url}`);
            
            // 设置请求超时
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
            
            // 发送请求
            fetch(url, { 
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'WeatherApp/1.0'
                }
            })
                .then(response => {
                    clearTimeout(timeoutId);
                    log(`收到响应: 状态 ${response.status}`);
                    if (!response.ok) {
                        if (response.status === 401) {
                            throw new Error('API密钥无效或已过期，请检查您的API密钥');
                        } else if (response.status === 404) {
                            throw new Error('找不到指定城市，请检查城市名称拼写');
                        } else if (response.status >= 500) {
                            throw new Error('天气服务器暂时不可用，请稍后再试');
                        } else {
                            throw new Error(`HTTP错误! 状态: ${response.status}`);
                        }
                    }
                    return response.json();
                })
                .then(data => {
                    log('成功获取天气数据');
                    displayWeather(data);
                })
                .catch(error => {
                    clearTimeout(timeoutId);
                    if (error.name === 'AbortError') {
                        log('请求超时');
                        showError('请求超时，请检查网络连接或稍后再试');
                    } else {
                        log(`获取天气数据失败: ${error.message}`);
                        showError(`无法获取天气数据: ${error.message}`);
                    }
                    // 尝试使用JSONP作为备选方案
                    useJSONP(city);
                });
        });
    }
    
    // 网络连接检查函数
    function checkNetworkConnection() {
        return new Promise((resolve) => {
            // 尝试连接到一个可靠的服务器
            fetch('https://httpbin.org/get', { 
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-cache'
            })
            .then(() => {
                log('网络连接正常');
                resolve(true);
            })
            .catch(() => {
                log('网络连接检查失败，尝试备用检查');
                // 备用检查：尝试连接到Google DNS
                fetch('https://8.8.8.8', { 
                    method: 'HEAD',
                    mode: 'no-cors'
                })
                .then(() => resolve(true))
                .catch(() => {
                    log('所有网络连接检查都失败');
                    resolve(false);
                });
            });
        });
    }
    
    // 使用JSONP作为备选方案
    function useJSONP(city) {
        log('尝试使用JSONP方式获取天气数据');
        
        // 创建回调函数
        window.weatherCallback = function(data) {
            log('JSONP回调成功');
            displayWeather(data);
        };
        
        // 创建script标签
        const script = document.createElement('script');
        script.src = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn&callback=weatherCallback`;
        
        // 处理错误
        script.onerror = function() {
            log('JSONP请求失败');
            showError('无法连接到天气API服务器');
        };
        
        // 添加到页面
        document.body.appendChild(script);
    }
    
    // 显示天气数据
    function displayWeather(data) {
        log('显示天气数据');
        
        try {
            // 保存天气数据到全局变量
            currentWeatherData = data;
            currentCityName = data.name;
            log(`保存天气数据: ${currentCityName}`);
            
            // 提取数据
            const cityName = data.name;
            const country = data.sys.country;
            const temp = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            
            // 构建HTML
            const html = `
                <div class="weather-card">
                    <div class="weather-header">
                        <h2>${cityName}, ${country}</h2>
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                    </div>
                    <div class="weather-body">
                        <div class="temp">${temp}°C</div>
                        <div class="description">${description}</div>
                        <div class="details">
                            <div class="detail">体感温度: ${feelsLike}°C</div>
                            <div class="detail">湿度: ${humidity}%</div>
                            <div class="detail">风速: ${windSpeed} m/s</div>
                        </div>
                    </div>
                </div>
            `;
            
            // 更新页面
            weatherInfo.innerHTML = html;
            
            // 显示推荐按钮
            if (getRecommendationsBtn) {
                getRecommendationsBtn.style.display = 'block';
                log('显示推荐按钮');
            }
            
            log('天气数据显示成功');
        } catch (error) {
            log(`显示天气数据失败: ${error.message}`);
            showError(`处理天气数据时出错: ${error.message}`);
        }
    }
    
    // 显示错误信息
    function showError(message) {
        log(`显示错误: ${message}`);
        weatherInfo.innerHTML = `<div class="error-message">${message}</div>`;
    }
    
    // 获取AI旅游推荐
    function getAIRecommendations(cityName, weatherData) {
        log(`开始获取${cityName}的AI旅游推荐`);
        
        // 显示加载状态
        if (recommendationsContent) {
            recommendationsContent.innerHTML = '<div class="loading-spinner"></div>正在生成AI推荐...';
            recommendationsInfo.style.display = 'block';
        }
        
        // 禁用按钮防止重复点击
        if (getRecommendationsBtn) {
            getRecommendationsBtn.disabled = true;
            getRecommendationsBtn.textContent = '生成中...';
        }
        
        // 构建天气描述
        const temp = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        
        // 构建AI提示词
        const prompt = `请为${cityName}推荐适合当前天气的旅游景点和活动。当前天气：温度${temp}°C，${description}，湿度${humidity}%，风速${windSpeed}m/s。请提供3-5个具体的景点推荐，包括景点名称、推荐理由、大概门票价格和注意事项。请用中文回答，格式要清晰易读。`;
        
        // 尝试使用免费的AI API
        callFreeAIAPI(prompt)
            .then(response => {
                log('AI推荐获取成功');
                displayRecommendations(response);
            })
            .catch(error => {
                log(`AI推荐获取失败: ${error.message}`);
                // 如果AI API失败，显示基于天气的静态推荐
                displayFallbackRecommendations(cityName, weatherData);
            })
            .finally(() => {
                // 恢复按钮状态
                if (getRecommendationsBtn) {
                    getRecommendationsBtn.disabled = false;
                    getRecommendationsBtn.textContent = '获取旅游推荐';
                }
            });
    }
    
    // 调用Google Gemini AI API（免费使用）
    async function callFreeAIAPI(prompt) {
        log('尝试调用Google Gemini AI API');
        
        // 检查API密钥是否已配置
        if (GEMINI_API_KEY === 'AIzaSy-your-api-key-here' || !GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
            log('Gemini API密钥未配置，使用本地推荐');
            throw new Error('请先配置Google AI Studio API密钥');
        }
        
        // 尝试主要模型和备用模型
        const models = [GEMINI_MODEL, ...BACKUP_MODELS];
        
        for (let i = 0; i < models.length; i++) {
            const model = models[i];
            log(`尝试模型 ${i + 1}: ${model}`);
            
            try {
                // 构建Gemini API URL
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `你是一个专业的旅游推荐助手。请根据以下天气信息，推荐合适的旅游景点和活动：\n\n${prompt}\n\n请提供具体的景点名称、活动建议和注意事项。`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 500,
                        }
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    log(`模型 ${i + 1} 调用成功`);
                    
                    // 处理Gemini API的响应格式
                    let generatedText = '';
                    if (data.candidates && data.candidates.length > 0) {
                        const candidate = data.candidates[0];
                        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                            generatedText = candidate.content.parts[0].text || '';
                        }
                    }
                    
                    if (generatedText && generatedText.trim()) {
                        return generatedText.trim();
                    }
                } else {
                    const errorText = await response.text();
                    log(`模型 ${i + 1} 响应错误: ${response.status} - ${errorText}`);
                    
                    if (response.status === 401 || response.status === 403) {
                        throw new Error('API密钥无效，请检查您的Google AI Studio API密钥');
                    } else if (response.status === 429) {
                        log(`模型 ${i + 1} 请求频率限制，尝试下一个...`);
                        continue;
                    } else if (response.status >= 500) {
                        log(`模型 ${i + 1} 服务不可用，尝试下一个...`);
                        continue;
                    }
                }
            } catch (error) {
                log(`模型 ${i + 1} 调用失败: ${error.message}`);
                if (error.message.includes('密钥')) {
                    throw error; // 如果是密钥问题，直接抛出
                }
                continue; // 其他错误继续尝试下一个模型
            }
        }
        
        // 所有模型都失败了
        log('所有Gemini模型都不可用，使用本地推荐');
        throw new Error('Gemini AI API暂时不可用，将显示本地推荐');
    }
    
    // 显示AI推荐结果
    function displayRecommendations(aiResponse) {
        log('显示AI推荐结果');
        
        if (recommendationsContent) {
            // 处理AI响应文本
            const formattedResponse = formatAIResponse(aiResponse);
            recommendationsContent.innerHTML = formattedResponse;
        }
    }
    
    // 格式化AI响应
    function formatAIResponse(response) {
        // 简单的文本格式化
        let formatted = response.replace(/\n/g, '<br>');
        
        // 尝试识别景点名称并加粗
        formatted = formatted.replace(/(\d+[、.]\s*)([^：]+)：/g, '<div class="recommendation-item"><h4>$2</h4><p>');
        formatted = formatted.replace(/<br><br>/g, '</p></div><br>');
        
        // 如果没有找到结构化内容，直接显示
        if (!formatted.includes('recommendation-item')) {
            formatted = `<div class="recommendation-item"><p>${formatted}</p></div>`;
        }
        
        return formatted;
    }
    
    // 显示备选推荐（基于天气的静态推荐）
    function displayFallbackRecommendations(cityName, weatherData) {
        log('显示备选推荐');
        
        const temp = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        
        let recommendations = '';
        
        // 根据温度和天气条件生成推荐
        if (temp > 25) {
            recommendations += `
                <div class="recommendation-item">
                    <h4>🏖️ 水上活动</h4>
                    <p>当前温度${temp}°C，适合进行水上活动。推荐游泳、划船或水上乐园。</p>
                    <p><strong>注意事项：</strong>注意防晒，多补充水分。</p>
                </div>
            `;
        } else if (temp < 10) {
            recommendations += `
                <div class="recommendation-item">
                    <h4>🏛️ 室内景点</h4>
                    <p>当前温度${temp}°C，建议选择室内景点。推荐博物馆、美术馆或购物中心。</p>
                    <p><strong>注意事项：</strong>注意保暖，穿着厚外套。</p>
                </div>
            `;
        } else {
            recommendations += `
                <div class="recommendation-item">
                    <h4>🌳 户外漫步</h4>
                    <p>当前温度${temp}°C，天气宜人，适合户外活动。推荐公园漫步、登山或骑行。</p>
                    <p><strong>注意事项：</strong>穿着舒适的运动鞋。</p>
                </div>
            `;
        }
        
        if (description.includes('雨')) {
            recommendations += `
                <div class="recommendation-item">
                    <h4>☔ 雨天活动</h4>
                    <p>当前天气有雨，推荐室内活动。可以参观当地的咖啡馆、书店或艺术展览。</p>
                    <p><strong>注意事项：</strong>携带雨具，选择有遮蔽的场所。</p>
                </div>
            `;
        }
        
        // 添加通用推荐
        recommendations += `
            <div class="recommendation-item">
                <h4>📍 ${cityName}特色</h4>
                <p>建议查询${cityName}的特色景点和当地美食，体验当地文化。</p>
                <p><strong>门票信息：</strong>具体价格请查询官方网站或现场咨询。</p>
            </div>
        `;
        
        if (recommendationsContent) {
            recommendationsContent.innerHTML = recommendations;
        }
    }
});