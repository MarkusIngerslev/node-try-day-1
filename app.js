"use stick";

import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

// ===== Test for localhost landing page ===== //
app.get("/", (request, response) => {
    response.send(`Your node survice is running 👍`);
});

// ===== Test route ===== //
app.get("/test", (request, response) => {
    response.send(`This is a test route (☞ﾟヮﾟ)☞`);
});

// ===== Users ===== //
app.get("/users", async (request, response) => {
    // Første forsøg
    // response.send(`This is the user route`);

    // Ny metode til at læse og vise fil
    const data = await fs.readFile("data.json");
    const users = JSON.parse(data);

    response.json(users);
});

// ===== Create User Route ===== //
app.post("/users", async (request, response) => {
    const newUser = request.body;

    newUser.id = new Date().getTime();
    // console.log(newUser);

    const data = await fs.readFile("data.json");
    const users = JSON.parse(data);

    users.push(newUser);
    console.log(`New user in database: ${newUser}`);
    fs.writeFile("data.json", JSON.stringify(users));

    response.json(users);
});

// ===== Update Users ===== //
app.put("/users/:id", async (request, response) => {
    const id = Number(request.params.id);
    // console.log(id);

    const data = await fs.readFile("data.json");
    const users = JSON.parse(data);

    let userToUpdate = users.find((user) => user.id === id);
    const body = request.body;

    userToUpdate.image = body.image;
    userToUpdate.mail = body.mail;
    userToUpdate.name = body.name;
    userToUpdate.title = body.title;

    fs.writeFile("data.json", JSON.stringify(users));
    response.json(users);
});

// ===== Delete User ===== //
app.delete("/users/:id", async (request, response) => {
    const id = Number(request.params.id);

    const data = await fs.readFile("data.json");
    const users = JSON.parse(data);

    const newUsers = users.filter((user) => user.id !== id);
    fs.writeFile("data.json", JSON.stringify(newUsers));

    response.json(users);
});
