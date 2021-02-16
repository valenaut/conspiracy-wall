$(function() {
    initializeCorkBoard();
    addItems();
    drawThreads();
});

var $cork;
var $thread;
function initializeCorkBoard() {
    $cork = $('.cork');
    $thread = $('.thread');

    $cork.draggable();
    $cork.on('mousedown', function () {
        $cork.css('cursor', 'grabbing');
    });
    $cork.on('mouseup', function() {
        $cork.css('cursor', 'grab');
    });

    $('.cork').mousewheel(function (event) {
        event.preventDefault();
        if (!getCurrentElement()) return;

        let scale = event.deltaY / 10;
        let image = document.getElementById(getCurrentElement());
        if (image.className === 'pin') return;

        let newWidth = image.width * (1 + scale);
        let newHeight = image.height * (1 + scale);
        if (newWidth > 200 && newWidth < 600) {
            if (newWidth < 600) {
                image.style.maxWidth = newWidth.toString() + 'px';
            }
            image.width = newWidth;
            image.height = newHeight;
        }
    });
}

function addItems() {
    addItem('bbm-crate', 100, 0);
    addItem('stash-house-invoice', -200, 100);
    addItem('stash-house-newspaper', 50, -350);
    addItem('jade-mycelium', -500, 300);
    addItem('ww-bbm-fm', 0, 600);

    addItem('olrock-irontooth', -800, -300);
    addItem('ind-rev-olrock', -550, -450);
    addItem('ww-olrock', -600, -750);
    addItem('ind-rev-olrock-bounty', -1050, -250);

    addItem('ww-vogmord-ship', -850, 400);
    addItem('ind-rev-vogmord-ship', -1000, 650);

    addItem('ww-mosscamp', -1100, 100);
    addItem('ind-rev-mosscamp', -1350, 200);

    addItem('ww-election-casmir', 900, -50);

    addItem('ww-dead-elf', 700, 450);
}

function drawThreads() {
    drawThread('bbm-crate', 'stash-house-invoice');
    drawThread('stash-house-invoice', 'stash-house-newspaper');
    drawThread('jade-mycelium', 'stash-house-invoice');
    drawThread('bbm-crate', 'ww-bbm-fm');

    drawThread('olrock-irontooth', 'ind-rev-olrock');
    drawThread('ww-olrock', 'olrock-irontooth');
    drawThread('olrock-irontooth', 'ind-rev-olrock-bounty');

    drawThread('ww-vogmord-ship', 'ind-rev-vogmord-ship');

    drawThread('ind-rev-mosscamp', 'ww-mosscamp');
}

const offsetX = 6000;
const offsety = 4400;
function addItem(itemName, x, y) {
    let top = y + offsety;
    let left = x + offsetX;
    let style = 'top: ' + top + 'px; left: ' + left + 'px;';
    let $div = $('<div>', {style: style, class: 'paper'});

    let src = 'images/' + itemName + '.png';
    let $img = $('<img>', {id: itemName, src: src, class: 'evidence'});

    $div.append($img);
    $cork.append($div);

    $div.mouseenter(function() {
        $(this).css('z-index', '3');
        var $img = $(this).children('.evidence');
        rememberElement($img.attr('id'));
    })
    $div.mouseleave(function() {
        $(this).css('z-index', '2');
        forgetElement();
    })

    addPin(itemName);
}

function drawThread(firstItemName, secondItemName) {
    $img1 = $('#' + firstItemName).parent();
    $img2 = $('#' + secondItemName).parent();

    let startPos = [$img1.position().left, $img1.position().top];
    let endPos = [$img2.position().left, $img2.position().top];

    const canvas = document.querySelector('.thread');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(startPos[0] + 12, startPos[1] + 12);
    ctx.lineTo(endPos[0] + 12, endPos[1] + 12);
    ctx.stroke();
}

function addPin(itemName) {
    const src = 'images/textures/pin.png';
    let $img = $('#' + itemName)
    let $div = $img.parent();
    
    let top = $img.position().top + 2;
    let left = $img.position().left + 2;
    let style = 'top: ' + top + 'px; left: ' + left + 'px;';
    let $pin = $('<img>', {class: 'pin', style: style, src: src});
    $div.append($pin);
}

function rememberElement(id) {
    localStorage.setItem('el', id);
}

function forgetElement() {
    localStorage.setItem('el', '');
}

function getCurrentElement(id) {
    return localStorage.getItem('el');
}