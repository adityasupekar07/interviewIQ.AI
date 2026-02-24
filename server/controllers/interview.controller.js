import fs from "fs"
export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume required" });
        }
        const filepath = req.file.path;
        const fileBuffer = await fs.promises.readFile(filepath)
        const uint8Array = new uint8Array(fileBuffer)

        const pdf = await pdfjsLib.getDocument({ data: uint8Array }).
            promise;
        const resumeText = " ";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(" ");
            resumeText += pageText + "\n";

        }
        resumeText = resumeText
            .replace(/\s+/g, " ")
            .trim();

        const message = [
            {
                role: "system",
                content: `
        Extract data from resume .
        
        Return strictly JSON:
        
        {
        "role:"string",
        "experience":"string",
        "projects":["project1","project2"],
        "skills":["skill1","skill2"]
        }
        `
            },
            {
                role: "user",
                content: resumeText
            }
        ]
        const aiResponce = await askAi(messages)
        const parsed = JSON.parse(aiResponce);
        fs.unlinkSync(filepath);
        res.json({
            role: parsed.role,
            experience: parsed.experience,
            projects: parsed.projects,
            skills: parsed.skills,
            resumeText
        })

    } catch (err) {
        console.error(err)
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: error.message });

    }
};