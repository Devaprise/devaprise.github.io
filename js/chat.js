var stat = 1;
var username = "Guest";
var chatDataRef = new Firebase('https://luminous-torch-6675.firebaseio.com/');
$(".my-name").html(username);

var m = $('#changename');

m.click(function(){
    var entered = prompt("Enter your name:", username);
    if (entered.length >= 50) {
        alert("Name must be less than 50 characters.")
    } else {
        username = entered;
    }
    $(".my-name").html(username);
});

chatDataRef.limit(100).on('child_added', function(snapshot) {
    stat = 2;
    var comment = snapshot.val();
    if (!comment.name) {
        return;
    }

    $('#comments-box').append($('<div class="comment"/>').html($('<div class="name"/>').html(comment.name)).append($('<div class="date"/>').html(comment.date)).append($('<div class="text"/>').html(comment.text)));
    $('#comments-box')[0].scrollTop = $('#comments-box')[0].scrollHeight;
});
var getTime = function() {
    var date = new Date;
    var hour = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();
    var time = hour+":"+(min<10? "0"+min : min)+":"+(sec<10? "0"+sec : sec)+" UTC";
    return time;
}
var postComment = function() {
    var time = getTime();
    var text = $('#post-area > #text-area').val();

    if ((text.indexOf('<script')!== -1 || text.indexOf('script>') !== -1) && pr === false) {
            alert("<script> tag not allowed.");
            return;
    } else if((text.indexOf('<style>') !== -1 || text.indexOf('style>') !== -1) && pr === false) {
            alert("<style> tag is not allowed");
            return;
    } else if((text.indexOf('<textarea>')!== -1 || text.indexOf('textarea>') !== -1) && pr === false){
            alert("<textarea> tag is not allowed");
            return;
    }else if (text.length === 0 ) {
        alert("Please type something into the comment box.");
        return;
    } else{
        chatDataRef.push({name: username, date: time, text: text});
        $('#text-area').val("");
        $('#text-area').focus();
    }
};

$('#post-comment').click(function() {
    postComment();
});
var updateTime = function() {
    if (stat === 2) {
        var time = getTime();
        $('#status').html(time);
    }
}
window.setInterval(updateTime, 100);

$('#text-area').keydown(function(k) { if (k.which == 18 || k.which == 36) { postComment();} });