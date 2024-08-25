# language: pt
@importante
Funcionalidade: Gestionar Mensagem
    @fast @rapido @mobile
    Cenário: Cadastrar mensagem
        Dado que eu tenha uma mensagem válida
        Quando enviar a mensagem para cadastrar
        Então a mensagem deve ser registrada com sucesso
    
    @slow @lento @dificil @mobile
    Cenário: Ao cadastrar mensagem sem usuário deve gerar um erro
        Dado que eu tenha uma mensagem sem o campo usuário
        Quando enviar a mensagem para cadastrar
        Então a mensagem não é cadastrada
        E deve apresentar erro indicando que o campo 'usuário' é obrigatório

