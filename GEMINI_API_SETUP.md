# Google Gemini API 配置指南

## 为什么选择 Google Gemini API？

1. **完全免费**: Gemini 1.5 Flash 模型完全免费使用，无需付费
2. **无需海外手机**: 只需要Google账号即可注册，无需海外手机号验证
3. **强大能力**: 支持多模态处理，文本生成能力优秀
4. **稳定服务**: Google提供稳定可靠的API服务
5. **中文支持**: 对中文理解和生成能力良好

## 如何获取 Google Gemini API 密钥

### 步骤一：访问 Google AI Studio

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 使用您的Google账号登录（如果没有请先注册）
3. 无需额外的手机号验证或实名认证

### 步骤二：创建API密钥

1. 在AI Studio页面点击 "Create API Key"
2. 选择或创建一个Google Cloud项目
3. 系统会自动生成API密钥
4. 复制生成的密钥（格式类似：`AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）

### 步骤三：配置到项目中

1. 打开 `script.js` 文件
2. 找到第 4 行的 `GEMINI_API_KEY` 配置
3. 将您的API密钥填入：
   ```javascript
   const GEMINI_API_KEY = 'AIzaSy-your-actual-api-key-here';
   ```

## 可用模型

- **gemini-1.5-flash**: 免费快速模型，适合实时对话和旅游推荐
- **gemini-1.5-pro**: 更强能力模型（有免费额度限制）
- **gemini-pro**: 标准模型，平衡性能和速度

## 免费额度

- **Gemini 1.5 Flash**: 完全免费，无使用限制
- **Gemini 1.5 Pro**: 每月有一定免费额度
- **无需绑定信用卡**: 免费模型可直接使用
- 详细额度信息请查看 [Google AI Studio 控制台](https://aistudio.google.com/)

## 故障排除

### 1. API密钥无效
- 检查密钥是否正确复制（包含完整的 `AIzaSy` 前缀）
- 确认密钥是否已在Google AI Studio中激活
- 检查Google账号是否有权限访问Gemini API

### 2. 请求失败
- 检查网络连接
- 确认API调用频率是否超限
- 查看浏览器控制台错误信息

### 3. 响应异常
- 检查请求参数格式是否正确
- 确认模型名称是否有效
- 查看 [Gemini API 文档](https://ai.google.dev/docs) 确认格式

### 4. 地区限制
- 如果遇到地区限制，可尝试使用VPN
- 确认Google账号所在地区支持Gemini API

## 安全提醒

⚠️ **重要**: 请不要将API密钥提交到公开的代码仓库中！
- 使用环境变量存储密钥
- 添加 `.env` 文件到 `.gitignore`
- 定期在Google AI Studio中轮换API密钥
- 设置API密钥的使用限制和监控

## 本地推荐备选方案

如果不想配置 API 密钥，项目也提供了基于天气条件的本地推荐功能，虽然不如 AI 生成的内容丰富，但仍然实用。