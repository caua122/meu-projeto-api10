async function buscarScript() {
    const id = document.getElementById("scriptId").value.trim();
    const result = document.getElementById("resultado");

    if (!id) {
        result.textContent = "Digite um ID.";
        return;
    }

    try {
        // TROCAR QUANDO HOSPEDAR
        const API_URL = "https://SEU-SERVIDOR";

        const response = await fetch(`${API_URL}/cs/${id}`);

        if (!response.ok) {
            result.textContent = `Erro: ID '${id}' não encontrado.`;
            return;
        }

        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 4);

    } catch (err) {
        result.textContent = "Erro ao conectar à API.";
        console.error(err);
    }
}
