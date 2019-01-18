/* Initial archive */

var Portal = (function () {

    function Portal() {
        if (!(this instanceof Portal)) {
            return new Portal();
        }
    }

    Portal.Init = function (tela) {

        Portal.adicionarEventoScroll(tela);

        Portal.navegacaoCategorias(tela);
    };

    Portal.adicionarEventoScroll = function (tela) {
        tela.addEventListener('scroll', Portal.scrollEvent);
    };

    Portal.scrollEvent = function (event) {

        console.log(window.scrollY);

        if (window.scrollY >= 400) {
            var header = document.querySelector('.header-sticky:not(.animated)');
            if (header) {
                header.classList.remove('animatable');
                header.classList.add('animated');
            }
        }

        if (window.scrollY < 400) {
            var header = document.querySelector('.header-sticky.animated');
            if (header) {
                header.classList.remove('animated');
                header.classList.add('animatable');
            }
        }

        if (window.scrollY > 947) {
            document.querySelectorAll('#depoimentos .animatable').forEach(function (el) {
                el.classList.remove('animatable');
                el.classList.add('animated');
            })
        }
    };

    Portal.navegacaoCategorias = function (tela) {
        var linksCategorias = tela.querySelectorAll('#listagem-categorias ul li');

        for (var i = 0; i < linksCategorias.length; i++) {
            linksCategorias[i].addEventListener('click', Portal.trocarAbaCategoria);
        }

    };

    Portal.trocarAbaCategoria = function (event) {

        //definindo os elementos 
        var target = event.target;
        var li, a, destino;

        if (target.nodeName === 'LI') {
            li = target;
            a = target.querySelector('a');
        } else {
            a = target;
            li = target.parentNode;
        }

        //obtendo o destino
        destino = a.getAttribute('href');

        //trocando a aba para a selecionada
        var lis = document.querySelectorAll('#listagem-categorias ul li');
        lis.forEach(function (el) {
            el.classList.remove('ativo');
        });
        li.classList.add('ativo');

        //trocando o conteudo (imagens) para o destino correspondente.
        var containers = document.querySelectorAll('#container-categorias-images .box-categorias');
        containers.forEach(function (container) {
            container.classList.add('animatable');
            container.classList.remove('animated');
        });

        var containerDestino = document.querySelector('#container-categorias-images ' + destino);
        containerDestino.classList.remove('animatable');
        containerDestino.classList.add('animated');

        event.preventDefault();
        return false;
    };

    return Portal;
})();