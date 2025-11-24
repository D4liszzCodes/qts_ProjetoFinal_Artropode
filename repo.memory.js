// Testes Unitários

let _data = []

async function _reset() {
    _data = [];
}

async function create({ nome, nome_cien, habitat, tempo_vida } = {}) {

    const registro = { nome, nome_cien, habitat, tempo_vida  }

    _data.push(registro)

    return { nome: registro.nome, nome_cien: registro.nome_cien, habitat: registro.habitat, tempo_vida: registro.tempo_vida  }

}

async function list() {
    const registro = _data
    return registro;
}


async function update(dado_antigo, dado_atualizado) {
    const listagem = _data.findIndex(item =>
        item.nome === dado_antigo.nome &&
        item.nome_cien === dado_antigo.nome_cien &&
        item.habitat === dado_antigo.habitat &&
        item.tempo_vida === dado_antigo.tempo_vida
    );

    if (listagem === -1){
        return null
    } 

    _data[listagem] = dado_atualizado
    return dado_atualizado
}

async function del(objeto) {
    const registro = _data.findIndex(item => item.nome === objeto.nome);

    if (registro !== -1) {
        _data.splice(registro, 1)
    }

    data_copia = _data
    return data_copia;
}


module.exports = {
    _reset,
    list,
    create,
    update,
    del
    
};

