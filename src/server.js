const express = require('express');
const fs = require('fs');
const path = require('path');

const { wa, launchConfig } = require('./wa');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor Iniciado! Porta: ${PORT}`);

    try {
        const client = await wa.create(launchConfig);
        console.log('Cliente criado:');
        
        if (client && await client.isConnected()) {

            console.log('Cliente Conectado!')
            fs.readFile('./src/data/contacts.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Erro ao ler o arquivo de contatos:', err);
                    return;
                }
                const contacts = JSON.parse(data).contacts;

                if (contacts && contacts.length > 0) {
                    async function start(client) {
                        try {
                            await client.sendText(contacts[0], "QUALQUER COISA!");
                        } catch (error) {
                            console.error('Erro ao enviar mensagem:', error);
                        }
                    }
                    start(client);
                } else {
                    console.error('Array de contatos está vazio');
                }
            });
        }
    } catch (error) {
        console.error('Erro de Conexão WA', error);
    }
});
