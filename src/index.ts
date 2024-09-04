import express from "express";
import { requestCount } from "./monitoring/requestCounts";
import client from "prom-client";
const app = express();
app.use(requestCount);

app.get("/user", (req,res) => {
    res.send({
        name: "Dhiru",
        age: 21,
    });
});
app.post("/user",(req,res) => {
    res.send({
        message: "Post endpoint gets hit"
    });
});
app.get("/metrics", async(req,res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})
app.listen(3000);