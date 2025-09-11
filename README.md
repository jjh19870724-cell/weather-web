# 城市天气查询应用

这是一个简单的网页应用，允许用户输入城市名称并查询当天的天气情况。

## 功能特点

- 简洁美观的用户界面
- 实时天气数据查询
- 显示温度、体感温度、湿度、风速等天气信息
- **🎯 AI智能旅游推荐**: 基于当前天气条件，使用免费AI模型生成个性化旅游建议
- 多重API支持，确保服务稳定性
- 响应式设计，适配各种设备屏幕
- 完善的错误处理和用户提示

## 使用方法

### 基础天气查询
1. 打开 `index.html` 文件在浏览器中运行应用
2. 点击"测试API"按钮验证您的API密钥是否有效
3. 在输入框中输入城市名称（如：北京、上海、广州等）
4. 点击"查询"按钮或按回车键获取天气信息

### AI旅游推荐功能
5. 成功获取天气信息后，会显示"获取旅游推荐"按钮
6. 点击该按钮获取基于当前天气的AI智能旅游推荐
7. 推荐内容包括适合的景点、活动和注意事项

### 故障排除
8. 如果遇到问题，点击"调试信息"按钮查看详细的错误信息

## API配置

### 1. OpenWeatherMap API（必需）

本应用使用 OpenWeatherMap API 获取天气数据：

1. 访问 [OpenWeatherMap官网](https://openweathermap.org/) 并注册账号
2. 登录后，在个人面板中获取免费的API密钥
3. 打开 `script.js` 文件，将第3行的 `YOUR_API_KEY` 替换为您获取的API密钥：

```javascript
const apiKey = 'YOUR_API_KEY'; // 替换为您的OpenWeatherMap API密钥
```

### 2. Google Gemini API（可选，用于AI推荐）

为了使用AI旅游推荐功能，您可以配置Google Gemini API（完全免费）：

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 并使用您的Google账号登录
2. 点击 "Create API Key" 创建密钥，选择或创建Google Cloud项目
3. 将API密钥配置到 `script.js` 文件第4行：

```javascript
const GEMINI_API_KEY = 'AIzaSy-your-api-key-here'; // 替换为您的Gemini API密钥
```

**注意**: 如果不配置Gemini API，应用仍然可以正常工作，但会使用本地生成的推荐内容代替AI推荐。

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API

## 注意事项

- 免费的API密钥有请求次数限制，请合理使用
- 城市名称支持中文和英文，但某些小城市可能需要使用英文名称
- 天气数据每小时更新一次

## 常见问题解答

### 点击查询按钮没有反应

可能的原因：

1. **API密钥问题**：确保您已正确替换了API密钥，并且该密钥是有效的。使用"测试API"按钮验证密钥。

2. **网络连接问题**：确保您的设备已连接到互联网。

3. **跨域资源共享(CORS)限制**：如果您直接在本地打开HTML文件，浏览器可能会阻止API请求。尝试使用本地服务器运行应用，例如使用Visual Studio Code的Live Server扩展。

4. **浏览器控制台错误**：按F12打开浏览器开发者工具，查看控制台中是否有错误信息。

5. **城市名称问题**：尝试使用英文城市名称，如"Beijing"而不是"北京"。

### AI推荐功能问题

**问题**: AI推荐不工作或显示错误

**可能原因**:
1. Google Gemini API密钥未配置或配置错误
2. 网络连接问题
3. API调用频率超限
4. 地区限制问题
5. Google AI服务暂时不可用

**解决方案**:
1. 检查 `script.js` 第4行的API密钥配置（确保包含完整的 `AIzaSy` 前缀）
2. 确认网络连接正常
3. 查看浏览器控制台的错误信息
4. 如果遇到地区限制，可尝试使用VPN
5. 如果是频率限制，等待几分钟后重试
6. 参考 [GEMINI_API_SETUP.md](./GEMINI_API_SETUP.md) 重新配置

**免费额度说明**:
- Gemini 1.5 Flash 模型完全免费，无使用限制
- 如果使用其他模型遇到额度问题，可切换到免费模型
- 详细额度信息请查看 [Google AI Studio 控制台](https://aistudio.google.com/)

### 如何查看详细错误信息

1. 点击页面底部的"调试信息"按钮查看详细的API请求和响应信息。

2. 按F12打开浏览器开发者工具，切换到"控制台"选项卡查看更多错误信息。

## 自定义

您可以通过修改 `style.css` 文件来自定义应用的外观，或者通过修改 `script.js` 文件来添加更多功能。