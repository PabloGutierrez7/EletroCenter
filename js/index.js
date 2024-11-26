fetch('js/backend.json')
    .then(response => response.json())
    .then(data=>{
       // salvar os dados vindos do back-end localmente 
       // vamos utilizar localstorage 
       localStorage.setItem('produtos',JSON.stringify(data));
       console.log('dados dos produtos salvo');
       
       setTimeout(() => {
        
    
       //esvaziar a area de produtos 
       $("#produtos").empty();
       
       data.forEach(produto=>{
        var produtoHTML = `
            <div class="item-card">
                 <a data-id =" ${produto.id}" href="/detalhes/" class="item">
                 <div class="img-container">
                 <img class="img-fluid" src="${produto.imagem}" alt="">
                 </div>
                 <div class="nome-rating">
                 <span class="bold colo-name">${produto.nome}</span>
                    <span><i class="mdi mdi-star"></i>
                    ${produto.rating}
                    </span>
                                    
                    </div>
                    <div class=" bold price">${produto.preco_promocional.toLocaleString('pt-BR',{ style:'currency',currency:'BRL'})}</div>
                   </a>
             </div>
        `;

        $("#produtos").append(produtoHTML);

       })
       
       $(".item").on('click',function(){
          var id = $(this).attr('data-id')
          localStorage.setItem('detalhe',id)
          app.views.main.router.navigate('/detalhes/')
   

       })
       }, 1200);
     
    })
    .catch(error => console.error('erro ao fazer fetch dos dados:'+ error))

    //ver quantos items de dentro do carrinho 

    setTimeout(() => {
      var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
      // Verifique se o carrinho é um array antes de acessar o length
      if (Array.isArray(carrinho)) {
          // Alimentar o contador da sacola com o número de itens no carrinho
          $('.btn-cart').attr('data-count', carrinho.length);
      } else {
          $('.btn-cart').attr('data-count', 0); // Caso não seja um array, definir como 0
      }
  }, 300);
  

  