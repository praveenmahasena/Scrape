const express = require("express");
const cors = require("cors");
const volleyball = require("volleyball");
const { scrape } = require("./scrape.js");
const cheerio = require("cheerio");
const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(volleyball);

// this route is to get all
app.get("/", async (req, res) => {
    try {
        let reslt = await scrape();
        const $ = cheerio.load(reslt);
        const setData = [];
        $(".quote").each((i, el) => {
            const text = $(el).find(".text").text().trim();
            const author = $(el).find(".author").text().trim();
            const totalTags = [];
            setData.push({ text, author });
        });
        console.log(setData);
        res.json({ data: setData });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});

// app.get("/:name", async (req, res) => {
//     const { name } = req.params;
//     if (!name) return res.status(400).json({ err: "thats not good" });
//     try {
//         const reslt = await scrape();

//         let reslut = await scrape();
//         const $ = cheerio.load(reslut);
//         const setData = [];
//         $(".quote").each((i, el) => {
//             const text = $(el).find(".text").text().trim();
//             const author = $(el).find(".author").text().trim();
//             const totalTags = [];
//             setData.push({ text, author });
//         });
//         let filtered = setData.filter(element=>element.author==name)
//         console.log(filtered)
//         return res.json(filtered)
//     } catch (e) {
//         console.log(err);
//         res.status(400).json({ err: e });
//     }
// });

module.exports = {
    app,
};
