// coletânea de testes



const repo = require("./repo.memory")

beforeEach(async () => {
await repo._reset()
});

// CREATE

test("valida se o nome é uma string", async() => {
    const artro = await repo.create({ nome: 'abelha' , nome_cien: 'Apoidea', habitat: 'campos floridos', tempo_vida: 12 })
    expect(typeof artro.nome).toBe('string')
});

// READ 

test("verifica se é retornado true/false para um objeto que não existe na listagem", async () => {
    await repo.create ({ nome: 'aranha' , nome_cien: 'Araneae', habitat: 'cavernas', tempo_vida: 24 })
    await repo.create ({ nome: 'besouro' , nome_cien: 'Coleoptera', habitat: 'florestas densas', tempo_vida: 15 })

    const listagem = await repo.list()

    expect(listagem).not.toContainEqual({nome:'escorpião',nome_cien:'Araneae', habitat:'cavernas',tempo_vida:10})
    
})
// UPDATE 

test("verifica se um objeto foi atualizado corretamente", async () => {
    await repo.create({ nome: 'abelha' , nome_cien: 'Apoidea', habitat: 'campos floridos', tempo_vida: 12 }) 
    
    const updated = await repo.update({ nome: 'abelha' , nome_cien: 'Apoidea', habitat: 'campos floridos', tempo_vida: 12 }, 
    { nome: 'abelha negra' , nome_cien: 'Apoidea', habitat: 'pastos', tempo_vida: 11 })

    expect(updated).toEqual({ nome: 'abelha negra' , nome_cien: 'Apoidea', habitat: 'pastos', tempo_vida: 11 })

    const listagem = await repo.list()
    expect(listagem).toContainEqual({ nome: 'abelha negra' , nome_cien: 'Apoidea', habitat: 'pastos', tempo_vida: 11 })
    expect(listagem).not.toContainEqual({ nome: 'abelha' , nome_cien: 'Apoidea', habitat: 'campos floridos', tempo_vida: 12 }) 
    
});

// DELETE - verificar se caso um item for excluido, o objeto inteiro é excluido junto

test('verifica se um objeto é deletado ao inserir um dado que não o pertence', async () => {
    await repo.create({ nome: 'mariposa', nome_cien: 'Lepidoptera', habitat: 'florestas densas', tempo_vida: 4});

    await repo.del({ nome: 'borboleta' });

    const listagem = await repo.list();

    expect(listagem.length).toEqual(0);
});

