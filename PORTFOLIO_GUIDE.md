# Portfolio Template Guide

## 🎯 How It Works

Your portfolio automatically adapts to the content in `personal-info.json`:

- **With your data**: Shows your complete professional portfolio
- **Empty/placeholder data**: Shows template with helpful placeholders

## 📝 Editing Your Portfolio

1. **Edit the main data file**:
   ```bash
   public/personal-info.json
   ```

2. **Template reference**:
   ```bash
   public/template.json  # Copy from here to add sections
   ```

## 🔄 Dynamic Content Generation

### Adding Projects
Copy this template and paste it in the `projects` array:
```json
{
  "title": "Your Project Name",
  "shortDescription": "Brief description for the card",
  "detailedDescription": "Detailed description with **highlighted tech** in double asterisks",
  "githubUrl": "https://github.com/username/repo",
  "deploymentUrl": "https://your-demo.com",
  "skills": ["Tech1", "Tech2", "Tech3"]
}
```

### Adding Experience
Copy this template and paste it in the `experience` array:
```json
{
  "title": "Job Title",
  "company": "Company Name",
  "period": "Start Date – End Date",
  "location": "City, State",
  "responsibilities": [
    "Achievement or responsibility 1",
    "Achievement or responsibility 2"
  ]
}
```

### Adding Skills
Add to any skill category:
```json
{ "name": "Skill Name", "primary": true }  // true = highlighted
```

### Adding Languages
```json
{ "name": "Language", "level": "Proficiency Level" }
```

## 🎨 Smart Features

- **Auto-generates cards** for each project you add
- **Highlights important tech** wrapped in `**asterisks**`
- **Shows placeholders** when sections are empty
- **Handles missing fields** gracefully
- **Professional styling** maintained automatically

## 🚀 Testing

1. **See your data**: Keep `personal-info.json` with your information
2. **See template**: Replace content with placeholder values or empty strings
3. **Empty state**: Copy `empty.json` over `personal-info.json`

The portfolio will automatically detect the state and show appropriate content!