// OpenWeatherMap API密钥 - 用户需要替换为自己的API密钥
const apiKey = '23181167dfbfe77b8616fe03b8aef05c'; // 请替换为您的OpenWeatherMap API密钥

// 添加全局错误处理
window.onerror = function(message, source, lineno, colno, error) {
    console.error('全局错误:', message, 'at', source, lineno, colno);
    if (typeof addDebugMessage === 'function') {
        addDebugMessage(`全局错误: ${message} at ${source}:${lineno}:${colno}`);
    }
    // 在页面上显示错误
    try {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.style.backgroundColor = 'white';
        errorDiv.style.padding = '10px';
        errorDiv.style.margin = '10px';
        errorDiv.style.border = '1px solid red';
        errorDiv.textContent = `JavaScript错误: ${message} (行: ${lineno}, 列: ${colno})`;
        document.body.prepend(errorDiv);
    } catch (e) {
        console.error('无法在页面上显示错误:', e);
    }
    return false;
};

// 添加全局调试信息数组和函数
let globalDebugMessages = [];
function globalAddDebugMessage(message) {
    const timestamp = new Date().toLocaleTimeString();
    globalDebugMessages.push(`[${timestamp}] ${message}`);
    console.log(`[DEBUG] ${message}`);
    // 尝试更新调试信息显示
    try {
        const debugInfoElement = document.getElementById('debug-info');
        if (debugInfoElement) {
            debugInfoElement.style.display = 'block';
            debugInfoElement.textContent = globalDebugMessages.join('\n');
        }
    } catch (e) {
        console.error('更新调试信息失败:', e);
        // 尝试创建一个新的调试元素
        try {
            let debugDiv = document.getElementById('global-debug-info');
            if (!debugDiv) {
                debugDiv = document.createElement('div');
                debugDiv.id = 'global-debug-info';
                debugDiv.style.backgroundColor = 'black';
                debugDiv.style.color = 'white';
                debugDiv.style.padding = '10px';
                debugDiv.style.margin = '10px';
                debugDiv.style.fontFamily = 'monospace';
                debugDiv.style.fontSize = '12px';
                debugDiv.style.maxHeight = '200px';
                debugDiv.style.overflow = 'auto';
                document.body.prepend(debugDiv);
            }
            debugDiv.textContent = globalDebugMessages.join('\n');
        } catch (e2) {
            console.error('无法创建调试元素:', e2);
        }
    }
}

// 直接执行一些代码，不依赖于DOMContentLoaded事件
globalAddDebugMessage('脚本开始执行');

// 测试按钮点击事件
function testButtonClicks() {
    globalAddDebugMessage('测试按钮点击事件');
    try {
        // 获取按钮元素
        const searchBtn = document.getElementById('search-btn');
        const testApiBtn = document.getElementById('test-api-btn');
        const debugBtn = document.getElementById('debug-btn');
        
        // 创建测试按钮
        const testBtn = document.createElement('button');
        testBtn.textContent = '测试按钮';
        testBtn.style.backgroundColor = 'purple';
        testBtn.style.color = 'white';
        testBtn.style.padding = '10px';
        testBtn.style.margin = '10px';
        testBtn.style.border = 'none';
        testBtn.style.borderRadius = '5px';
        testBtn.style.cursor = 'pointer';
        
        // 添加点击事件
        testBtn.addEventListener('click', function() {
            globalAddDebugMessage('测试按钮被点击');
            alert('测试按钮点击成功!');
        });
        
        // 添加到页面
        document.body.prepend(testBtn);
        globalAddDebugMessage('测试按钮已添加到页面');
        
        // 尝试模拟点击现有按钮
        if (searchBtn) {
            globalAddDebugMessage('尝试模拟点击搜索按钮');
            setTimeout(() => {
                try {
                    searchBtn.click();
                    globalAddDebugMessage('搜索按钮点击模拟成功');
                } catch (e) {
                    globalAddDebugMessage(`搜索按钮点击模拟失败: ${e.message}`);
                }
            }, 2000);
        }
    } catch (e) {
        globalAddDebugMessage(`测试按钮点击事件失败: ${e.message}`);
    }
}

// 在页面加载后执行测试
setTimeout(testButtonClicks, 1000);

document.addEventListener('DOMContentLoaded', () => {
    globalAddDebugMessage('DOM内容已加载');
    
    // 检查DOM元素是否存在
    const cityInput = document.getElementById('city-input');
    globalAddDebugMessage(`城市输入框元素: ${cityInput ? '已找到' : '未找到'}`);
    
    const searchBtn = document.getElementById('search-btn');
    globalAddDebugMessage(`搜索按钮元素: ${searchBtn ? '已找到' : '未找到'}`);
    
    const testApiBtn = document.getElementById('test-api-btn');
    globalAddDebugMessage(`测试API按钮元素: ${testApiBtn ? '已找到' : '未找到'}`);
    
    const weatherInfo = document.getElementById('weather-info');
    globalAddDebugMessage(`天气信息元素: ${weatherInfo ? '已找到' : '未找到'}`);
    
    const debugBtn = document.getElementById('debug-btn');
    globalAddDebugMessage(`调试按钮元素: ${debugBtn ? '已找到' : '未找到'}`);
    
    const debugInfo = document.getElementById('debug-info');
    globalAddDebugMessage(`调试信息元素: ${debugInfo ? '已找到' : '未找到'}`);
    
    const debugSection = document.querySelector('.debug-section');
    globalAddDebugMessage(`调试区域元素: ${debugSection ? '已找到' : '未找到'}`);
    
    // 直接在页面上显示调试信息
    if (debugInfo) {
        debugInfo.style.display = 'block';
        debugInfo.textContent = globalDebugMessages.join('\n');
    }
    
    // 显示调试区域
    debugSection.style.display = 'block';
    
    // 调试信息数组
    let debugMessages = [];
    
    // 添加调试信息的函数
    function addDebugMessage(message) {
        const timestamp = new Date().toLocaleTimeString();
        debugMessages.push(`[${timestamp}] ${message}`);
        // 只保留最近的20条消息
        if (debugMessages.length > 20) {
            debugMessages.shift();
        }
        
        // 不需要在这里更新调试信息显示，因为addDebugMessage函数已经处理了
    }
    
    // 显示调试信息
    globalAddDebugMessage('正在绑定调试按钮事件');
    debugBtn.addEventListener('click', function() {
        globalAddDebugMessage('调试按钮被点击');
        if (debugInfo.style.display === 'block') {
            debugInfo.style.display = 'none';
            debugBtn.textContent = '显示调试信息';
        } else {
            debugInfo.style.display = 'block';
            // 合并全局和局部调试信息
            const allMessages = [...globalDebugMessages, ...debugMessages];
            debugInfo.textContent = allMessages.join('\n');
            debugBtn.textContent = '隐藏调试信息';
        }
    });
    
    // 测试API连接
    globalAddDebugMessage('正在绑定测试API按钮事件');
    testApiBtn.addEventListener('click', function() {
        globalAddDebugMessage('测试API按钮被点击');
        addDebugMessage('正在测试API连接...');
        weatherInfo.innerHTML = '<div class="placeholder-text">正在测试API连接...</div>';
        
        // 使用北京作为测试城市
        const testCity = 'Beijing';
        const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=${testCity}&appid=${apiKey}&units=metric&lang=zh_cn`;
        
        addDebugMessage(`测试URL: ${testUrl}`);
        globalAddDebugMessage(`测试URL: ${testUrl}`);
        
        // 使用JSONP方式请求数据
        globalAddDebugMessage('尝试使用JSONP方式测试API...');
        
        // 定义回调函数
        window.testApiCallback = function(data) {
            globalAddDebugMessage('测试API回调函数被调用');
            addDebugMessage('API连接测试成功!');
            weatherInfo.innerHTML = `
                <div class="placeholder-text" style="color: #27ae60;">
                    <div>✓ API连接测试成功!</div>
                    <div>您的API密钥有效，可以正常使用。</div>
                    <div>现在可以输入城市名称进行查询。</div>
                </div>
            `;
            // 清理script标签
            const scriptElement = document.getElementById('test-api-script');
            if (scriptElement) {
                document.body.removeChild(scriptElement);
            }
        };
        
        // 创建script标签
        const script = document.createElement('script');
        script.id = 'test-api-script';
        script.src = `https://api.openweathermap.org/data/2.5/weather?q=${testCity}&appid=${apiKey}&units=metric&lang=zh_cn&callback=testApiCallback`;
        
        // 处理加载错误
        script.onerror = function() {
            globalAddDebugMessage('JSONP测试API请求失败');
            addDebugMessage(`测试失败: 无法加载数据`);
            weatherInfo.innerHTML = `
                <div class="placeholder-text">
                    <div class="error-message">API连接测试失败</div>
                    <div>可能的原因:</div>
                    <ul style="text-align: left; margin-top: 10px;">
                        <li>API密钥无效或已过期</li>
                        <li>网络连接问题</li>
                        <li>API服务暂时不可用</li>
                        <li>跨域资源共享(CORS)限制</li>
                    </ul>
                    <div style="margin-top: 10px;">请检查控制台和调试信息获取更多详情</div>
                </div>
            `;
            // 清理script标签
            document.body.removeChild(script);
        };
        
        // 添加到页面
        document.body.appendChild(script);
        globalAddDebugMessage('JSONP测试API script标签已添加到页面');
        
        // 同时尝试使用fetch API（作为备选方案）
        globalAddDebugMessage('同时尝试使用fetch API测试API...');
        fetch(testUrl)
            .then(response => {
                addDebugMessage(`测试响应状态码: ${response.status}`);
                
                if (response.ok) {
                    addDebugMessage('API连接测试成功!');
                    weatherInfo.innerHTML = `
                        <div class="placeholder-text" style="color: #27ae60;">
                            <div>✓ API连接测试成功!</div>
                            <div>您的API密钥有效，可以正常使用。</div>
                            <div>现在可以输入城市名称进行查询。</div>
                        </div>
                    `;
                    return response.json();
                } else {
                    throw new Error(`API连接测试失败 (状态码: ${response.status})`);
                }
            })
            .then(data => {
                addDebugMessage(`测试数据: ${JSON.stringify(data).substring(0, 100)}...`);
            })
            .catch(error => {
                addDebugMessage(`测试失败: ${error.message}`);
                weatherInfo.innerHTML = `
                    <div class="placeholder-text">
                        <div class="error-message">API连接测试失败</div>
                        <div>可能的原因:</div>
                        <ul style="text-align: left; margin-top: 10px;">
                            <li>API密钥无效或已过期</li>
                            <li>网络连接问题</li>
                            <li>API服务暂时不可用</li>
                            <li>跨域资源共享(CORS)限制</li>
                        </ul>
                        <div style="margin-top: 10px;">请检查控制台和调试信息获取更多详情</div>
                    </div>
                `;
            });
    });
    
    // 当点击搜索按钮或按下回车键时获取天气
    globalAddDebugMessage('正在绑定搜索按钮事件');
    searchBtn.addEventListener('click', function() {
        globalAddDebugMessage('搜索按钮被点击');
        getWeather();
    });
    
    globalAddDebugMessage('正在绑定输入框回车事件');
    cityInput.addEventListener('keypress', function(e) {
        globalAddDebugMessage(`键盘按键: ${e.key}`);
        if (e.key === 'Enter') {
            globalAddDebugMessage('回车键被按下');
            getWeather();
        }
    });
    
    // 获取天气数据的函数
    function getWeather() {
        try {
            globalAddDebugMessage('getWeather函数被调用');
            const cityName = cityInput.value.trim();
            globalAddDebugMessage(`输入的城市: "${cityName}"`);
            
            if (cityName === '') {
                globalAddDebugMessage('错误: 城市名称为空');
                showError('请输入城市名称');
                return;
            }
            
            // 显示加载状态
            weatherInfo.innerHTML = '<div class="placeholder-text">正在加载天气数据...</div>';
            
            // 构建API URL - 使用中文接口
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=zh_cn`;
            
            // 记录调试信息
            addDebugMessage(`请求城市: ${cityName}`);
            globalAddDebugMessage(`API URL: ${apiUrl}`);
            globalAddDebugMessage(`API密钥: ${apiKey}`);
            console.log('当前API URL:', apiUrl);
            
            // 创建一个script元素来处理JSONP请求（解决CORS问题）
            globalAddDebugMessage('尝试使用JSONP方式请求数据...');
            
            // 定义回调函数
            window.weatherCallback = function(data) {
                globalAddDebugMessage('JSONP回调函数被调用');
                globalAddDebugMessage(`收到数据: ${JSON.stringify(data).substring(0, 100)}...`);
                displayWeather(data);
                // 清理script标签
                const scriptElement = document.getElementById('weather-api-script');
                if (scriptElement) {
                    document.body.removeChild(scriptElement);
                }
            };
            
            // 创建script标签
            const script = document.createElement('script');
            script.id = 'weather-api-script';
            script.src = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=zh_cn&callback=weatherCallback`;
            
            // 处理加载错误
            script.onerror = function() {
                globalAddDebugMessage('JSONP请求失败');
                showError('无法加载天气数据，可能是网络问题或API密钥无效');
                // 清理script标签
                document.body.removeChild(script);
            };
            
            // 添加到页面
            document.body.appendChild(script);
            globalAddDebugMessage('JSONP script标签已添加到页面');
            
            // 同时尝试使用fetch API（作为备选方案）
            globalAddDebugMessage('同时尝试使用fetch API请求数据...');
            fetch(apiUrl)
                .then(response => {
                    addDebugMessage(`收到响应状态码: ${response.status}`);
                    globalAddDebugMessage(`收到响应: 状态码 ${response.status}`);
                    console.log('收到响应:', response.status);
                    
                    if (!response.ok) {
                        const errorMsg = `城市未找到或网络错误 (状态码: ${response.status})`;
                        addDebugMessage(`错误: ${errorMsg}`);
                        globalAddDebugMessage(`错误: ${errorMsg}`);
                        throw new Error(errorMsg);
                    }
                    globalAddDebugMessage('响应成功，正在解析JSON');
                    return response.json();
                })
                .then(data => {
                    addDebugMessage('成功获取天气数据');
                    globalAddDebugMessage(`收到数据: ${JSON.stringify(data).substring(0, 100)}...`);
                    console.log('收到数据:', data);
                    displayWeather(data);
                })
                .catch(error => {
                    const errorMsg = `API错误: ${error.message}`;
                    addDebugMessage(errorMsg);
                    globalAddDebugMessage(`错误: ${error.message}`);
                    console.error('发生错误:', error);
                    showError(errorMsg);
                });
        } catch (error) {
            const errorMsg = `请求异常: ${error.message}`;
            addDebugMessage(errorMsg);
            globalAddDebugMessage(`getWeather函数异常: ${error.message}`);
            console.error('请求异常:', error);
            showError(errorMsg);
        }
        
        // 更新调试信息显示
        if (debugInfo.style.display === 'block') {
            debugInfo.textContent = debugMessages.join('\n');
        }
    }
    
    // 显示天气信息的函数
    function displayWeather(data) {
        try {
            globalAddDebugMessage('displayWeather函数被调用');
            // 提取需要的数据
            const cityName = data.name;
            const country = data.sys.country;
            const temperature = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;
            
            globalAddDebugMessage(`城市名称: ${cityName}, 国家: ${country}`);
            globalAddDebugMessage(`温度: ${temperature}°C, 天气: ${weatherDescription}`);
            
            // 构建HTML
            const html = `
                <div class="weather-details">
                    <div class="city-name">${cityName}, ${country}</div>
                    <div class="temperature">${temperature}°C</div>
                    <div class="weather-condition">
                        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}">
                        <span>${weatherDescription}</span>
                    </div>
                    <div class="weather-details-row">
                        <div class="weather-detail">
                            <div class="detail-label">体感温度</div>
                            <div class="detail-value">${feelsLike}°C</div>
                        </div>
                        <div class="weather-detail">
                            <div class="detail-label">湿度</div>
                            <div class="detail-value">${humidity}%</div>
                        </div>
                        <div class="weather-detail">
                            <div class="detail-label">风速</div>
                            <div class="detail-value">${windSpeed} m/s</div>
                        </div>
                    </div>
                </div>
            `;
            
            // 更新DOM
            weatherInfo.innerHTML = html;
            globalAddDebugMessage('天气信息显示成功');
        } catch (e) {
            globalAddDebugMessage(`displayWeather函数异常: ${e.message}`);
            showError(`显示天气信息时发生错误: ${e.message}`);
        }
    }
    
    // 显示错误信息的函数
    function showError(message) {
        try {
            globalAddDebugMessage(`showError函数被调用: ${message}`);
            weatherInfo.innerHTML = `
                <div class="placeholder-text">
                    <div class="error-message">${message}</div>
                    <div>请尝试其他城市名称</div>
                </div>
            `;
            globalAddDebugMessage('错误信息显示成功');
        } catch (e) {
            globalAddDebugMessage(`showError函数异常: ${e.message}`);
            console.error('显示错误信息时发生异常:', e);
            // 尝试使用最简单的方式显示错误
            try {
                weatherInfo.textContent = `错误: ${message} (显示错误时发生异常: ${e.message})`;
            } catch (e2) {
                console.error('无法显示错误信息:', e2);
            }
        }
    }
});