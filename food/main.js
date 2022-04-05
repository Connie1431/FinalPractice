$(function(){
    $("input").on("click",function(){
        //debuggeer;
        //alert("hi");
        var numberOfListItem = $("li").length;
        var ramdomChildNumber = Math.floor(Math.random()*numberOfListItem);
        $("h1").text($("li").eq(ramdomChildNumber).text());
    });
});