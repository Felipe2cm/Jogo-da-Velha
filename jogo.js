var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 123;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;
matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;
matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function() {
    $('#palco_jogo').hide();

    $('#btn_iniciar_jogo').click(function() {
        if ($('#jogador1').val() == '') {
            alert('Insira um nome ao jogador 1');
            return false;
        }

        if ($('#jogador2').val() == '') {
            alert('Insira um nome ao jogador 2');
            return false;
        }

        $('#nome_jogador1').html($('#jogador1').val());
        $('#nome_jogador2').html($('#jogador2').val());

        $('#palco_jogo').show();
        $('#pagina_inicial').hide();
    });

    $('.jogada').click(function() {
        id_campo_clicado = this.id;
        $('#' + id_campo_clicado).off();

        jogada(id_campo_clicado);
    });

    function jogada(id) {
        var icone = '';
        var ponto = 0;

        if (rodada == 1) {
            //vez do jogador 1
            ponto = -1;
            icone = "url('imagens/marcacao_1.png')";
            rodada = 0;
        } else {
            //vez do jogador 2

            ponto = 1;
            icone = "url('imagens/marcacao_2.png')"
            rodada = 1;
        }

        $('#' + id).css('background-image', icone);

        var linha_coluna = id.split('-');

        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        verificaPontos();
    }

    function verificaPontos() {
        var ponto = 0;

        //verifica horizontal
        for (var i = 1; i < 4; i++) {
            ponto += matriz_jogo['a'][i];
        }
        ponto = ganhador(ponto);

        for (var i = 1; i < 4; i++) {
            ponto += matriz_jogo['b'][i];
        }
        ponto = ganhador(ponto);

        for (var i = 1; i < 4; i++) {
            ponto += matriz_jogo['c'][i];
        }
        ponto = ganhador(ponto);

        for (var i = 1; i < 4; i++) {
            ponto += matriz_jogo['a'][i];
            ponto += matriz_jogo['b'][i];
            ponto += matriz_jogo['c'][i];

            ponto = ganhador(ponto);
        }

        ponto = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];

        ponto = ganhador(ponto);

        ponto = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];

        ponto = ganhador(ponto);
    }

    function ganhador(pontos) {
        if (pontos == 3) {
            alert('Jogador 2 é o vencedor');
            $('.jogada').off();
        } else if (pontos == -3) {
            alert('Jogador 1 é o vencedor');
            $('.jogada').off();
        }
        return 0;
    }

});