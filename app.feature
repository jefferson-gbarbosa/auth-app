Feature: Autenticação de Usuário

  # Descrição: Garante o funcionamento do sistema de autenticação, incluindo login, cadastro e recuperação de senha.

  Scenario: Login com credenciais válidas
    Given que o usuário está na página de login
    When o usuário digita "email@valido.com" no campo de email
    And o usuário digita "senha123" no campo de senha
    And o usuário clica no botão "Entrar"
    Then o usuário deve ser redirecionado para a página de boas-vindas
    And o usuário deve ver a mensagem "Bem-vindo, [nome do usuário]"

  Scenario: Login com credenciais inválidas (email incorreto)
    Given que o usuário está na página de login
    When o usuário digita "emailinvalido" no campo de email
    And o usuário digita "senha123" no campo de senha
    And o usuário clica no botão "Entrar"
    Then o usuário deve ver uma mensagem de erro "Email ou senha inválidos"
    And o usuário deve permanecer na página de login

  Scenario: Login com credenciais inválidas (senha incorreta)
    Given que o usuário está na página de login
    When o usuário digita "email@valido.com" no campo de email
    And o usuário digita "senhaincorreta" no campo de senha
    And o usuário clica no botão "Entrar"
    Then o usuário deve ver uma mensagem de erro "Email ou senha inválidos"
    And o usuário deve permanecer na página de login

  Scenario: Cadastro de novo usuário com dados válidos
    Given que o usuário está na página de cadastro
    When o usuário digita "nome_teste" no campo de nome
    And o usuário digita "email_teste@valido.com" no campo de email
    And o usuário digita "senha123" no campo de senha
    And o usuário clica no botão "Cadastrar"
    Then o usuário deve ser redirecionado para a página de confirmação de email
    And o usuário deve ver a mensagem "Verifique seu email para confirmar o cadastro"

  Scenario: Cadastro de novo usuário com dados inválidos (email já cadastrado)
    Given que o usuário está na página de cadastro
    And que um usuário com o email "email_teste@valido.com" já está cadastrado
    When o usuário digita "nome_teste" no campo de nome
    And o usuário digita "email_teste@valido.com" no campo de email
    And o usuário digita "senha123" no campo de senha
    And o usuário clica no botão "Cadastrar"
    Then o usuário deve ver uma mensagem de erro "Email já cadastrado"
    And o usuário deve permanecer na página de cadastro

  Scenario: Recuperação de senha com email válido
    Given que o usuário está na página de recuperação de senha
    When o usuário digita "email@valido.com" no campo de email
    And o usuário clica no botão "Enviar"
    Then o usuário deve ver uma mensagem "Um email com instruções foi enviado para seu email"

  Scenario: Recuperação de senha com email inválido
    Given que o usuário está na página de recuperação de senha
    When o usuário digita "emailinvalido" no campo de email
    And o usuário clica no botão "Enviar"
    Then o usuário deve ver uma mensagem de erro "Email não encontrado"

  Scenario: Redefinição de senha com token válido
    Given que o usuário está na página de redefinição de senha
    And que o usuário possui um token de redefinição de senha válido
    When o usuário digita "nova_senha" no campo de nova senha
    And o usuário digita "nova_senha" no campo de confirmação de senha
    And o usuário clica no botão "Redefinir"
    Then o usuário deve ser redirecionado para a página de login
    And o usuário deve ver a mensagem "Senha redefinida com sucesso"

  Scenario: Redefinição de senha com token inválido
    Given que o usuário está na página de redefinição de senha
    And que o usuário possui um token de redefinição de senha inválido
    When o usuário digita "nova_senha" no campo de nova senha
    And o usuário digita "nova_senha" no campo de confirmação de senha
    And o usuário clica no botão "Redefinir"
    Then o usuário deve ver uma mensagem de erro "Token inválido"