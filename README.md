# TrustLens - Document Copilot Demo

An enterprise document AI assistant demo showcasing **transparent confidence scoring** and **progressive disclosure** UX patterns.

## 🎯 Purpose

This is a **frontend-only POC/hackathon demo** that simulates an enterprise document Copilot (similar to Egnyte Copilot). It demonstrates:

- **Scope-aware answers**: Results change based on Global / Folder / Selected Files
- **Confidence transparency**: Every answer has High / Medium / Low confidence
- **Progressive disclosure**: Details hidden by default, revealed on click

## ✨ Key Features

### 1. Search Scope Selection
- **Global**: Search all documents
- **Folder**: Search only current folder
- **Selected Files**: Search only checked files

### 2. Confidence Levels
- 🟢 **High**: Answer well-supported by multiple relevant documents
- 🟡 **Medium**: Some relevant content found, but incomplete coverage
- 🔴 **Low**: Limited or no relevant content in scope

### 3. Progressive Disclosure
**Default view shows:**
- Answer text
- Confidence badge
- Scope used
- Files reviewed count

**On click reveals:**
- Why this confidence level
- Search metrics (files in scope → accessible → reviewed → matches)
- Scope limitations
- Source files used

## 🚀 Quick Start

```bash
cd trustlens-demo
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Try These Scenarios

### Scenario 1: High Confidence
1. Set scope to **All Documents**
2. Ask: "What's our NDA confidentiality period?"
3. Result: High confidence (relevant files found globally)

### Scenario 2: Medium Confidence
1. Click the **Legal** folder
2. Change scope to **Legal folder**
3. Ask about PTO policy
4. Result: Low confidence (HR docs not in Legal folder)

### Scenario 3: File-Specific Search
1. Check some files in the sidebar
2. Change scope to **Selected Files**
3. Ask any question
4. Result: Confidence depends on whether relevant files are selected

## 📁 Project Structure

```
trustlens-demo/
├── src/
│   ├── components/
│   │   ├── Sidebar.js          # File browser with folder tree
│   │   ├── ChatArea.js         # Chat container + input
│   │   ├── ScopeSelector.js    # Global/Folder/Selected toggle
│   │   ├── Message.js          # User & assistant messages
│   │   └── ConfidenceDetails.js # Expandable metrics panel
│   ├── data/
│   │   └── mockData.js         # Mock files, folders, responses
│   ├── App.js                  # Main app + state management
│   └── App.css                 # Global styles + CSS variables
└── public/
    └── index.html
```

## 🎨 Design Principles

1. **Progressive Disclosure** - Don't overwhelm; details on demand
2. **Visual Confidence** - Color-coded badges for instant recognition
3. **Context Awareness** - Always show what scope was used
4. **Transparency** - "Why?" is always one click away
5. **Realistic Feel** - Typing indicators, smooth animations

## 🔧 Technical Notes

- **React** (Create React App)
- **No external UI libraries** - Pure CSS
- **No backend** - All data is mocked
- **No AI** - Responses are pattern-matched
- **~70KB gzipped** total bundle size

## 📝 Mock Data

The demo includes realistic mock data:
- **Legal**: NDAs, contracts, agreements
- **Finance**: Reports, budgets, expense policies
- **HR**: Handbook, benefits, PTO, remote work
- **Engineering**: Architecture, API docs, security

Responses are matched by keywords and vary based on scope to demonstrate the confidence system.

---

Built for hackathon demonstration purposes. Not a production application.
