var localCarrinho =localStorage.getItem('carrinho')

if(localCarrinho){
    var carrinho =JSON.parse(localCarrinho)
    if(carrinho.length > 0){
        //tem items no carrinho
        //renderizar o carrinho
        renderizarCarrinho()
        //somar totais dos produtos
        calcularTotal()
    }else{
        //mostrar carrinho vazio
        carrinhoVazio()
    }

}else{
    //mostrar carrinho vazio
    carrinhoVazio()
}

function renderizarCarrinho() {
    // Esvaziar a área dos itens
    $("#listaCarrinho").empty();

    // Percorrer o carrinho e alimentar a área
    $.each(carrinho, function (index, itemCarrinho) {
        var itemDiv = `
            <div class="item-carrinho" data-index="${index}">
                <div class="area-img">
                    <img src="${itemCarrinho.item.imagem}" alt="">
                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="name-prod">
                            ${itemCarrinho.item.nome}
                        </span>
                        <a class="delete-item" href="#">
                            <i class="mdi mdi-close"></i>
                        </a>
                    </div>
                    <div class="middle">
                        <span>${itemCarrinho.item.principal_caracteristica}</span>
                    </div>
                    <div class="preco-quantidade">
                        <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        <div class="count">
                            <a class="minus" data-index="${index}" href="#">-</a>
                            <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                            <a class="plus" data-index="${index}" href="#">+</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $("#listaCarrinho").append(itemDiv);
    });
}

// Evento para diminuir a quantidade
$("#listaCarrinho").on('click', '.minus', function () {
    var index = $(this).data('index');
    console.log('O índice é', index);

    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        calcularTotal();
    } else {
        var itemname = carrinho[index].item.nome;
        app.dialog.confirm(`Gostaria de remover <strong>${itemname}</strong>?`, 'REMOVER', function () {
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            calcularTotal();
        });
    }
});

// Evento para aumentar a quantidade
$("#listaCarrinho").on('click', '.plus', function () {
    var index = $(this).data('index');
    console.log('O índice é', index);

    carrinho[index].quantidade++;
    carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
    calcularTotal();
});


function calcularTotal(){
    var totalcarrinho = 0
    $.each(carrinho,function(index,itemCarrinho){
        totalcarrinho += itemCarrinho.total_item
    })
    //mostrar o total
   $("#subtotal").html(totalcarrinho.toLocaleString('pt-BR',{ style:'currency',currency:'BRL'}))
}

function carrinhoVazio() {
    console.log('Carrinho está vazio');
    $("#listaCarrinho").empty();

    // Sumir com os itens de totais e botões
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');

    // Mostrar sacolinha vazia
    $("#listaCarrinho").html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif">
        </div>
    `);
}

$("#esvaziar").on('click', function () {
    app.dialog.confirm('Tem certeza que deseja esvaziar o carrinho?', 'ESVAZIAR', function () {
        // Apagar o localStorage do carrinho
        localStorage.removeItem('carrinho');
        
        // Resetar o array do carrinho para vazio
        carrinho = [];

        // Atualizar a interface
        carrinhoVazio();
    });
});


$("#listaCarrinho").on('click', '.delete-item', function () {
    var index = $(this).closest('.item-carrinho').data('index'); // corrigido o seletor

    app.dialog.confirm('Tem certeza que quer remover este item?', 'Remover', function () {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        // Atualizar a página
        if (carrinho.length > 0) {
            renderizarCarrinho();
            calcularTotal();
        } else {
            carrinhoVazio();
        }
    });
});
