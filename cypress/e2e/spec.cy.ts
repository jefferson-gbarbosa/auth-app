describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
  })
})



// Como testar cada página?
// Home
// Verificar se os elementos da página (textos, imagens, links) estão sendo exibidos corretamente.
// Testar a navegação para outras páginas através dos links.
// Verificar se o layout da página está responsivo e se adapta a diferentes tamanhos de tela.
// Profile
// Verificar se os dados do usuário (nome, email, etc.) estão sendo exibidos corretamente.
// Testar a funcionalidade de edição de perfil, verificando se os dados são atualizados corretamente no banco de dados.
// Testar a funcionalidade de upload de foto de perfil, verificando se a imagem é exibida corretamente e armazenada no servidor.
// Reset Password
// Verificar se o formulário de reset de senha está funcionando corretamente, enviando o email para o usuário.
// Testar o link de reset de senha, verificando se ele redireciona para a página correta e se o usuário consegue definir uma nova senha.
// Verificar se o processo de reset de senha está seguro e impede que usuários maliciosos alterem a senha de outros usuários.
// Forgot Password
// Verificar se o formulário de "Esqueci minha senha" está funcionando corretamente, enviando o email para o usuário com o link de reset.
// Testar o link de reset de senha, verificando se ele redireciona para a página correta e se o usuário consegue definir uma nova senha.
// Verificar se o processo de "Esqueci minha senha" está seguro e impede que usuários maliciosos obtenham acesso à conta de outros usuários.