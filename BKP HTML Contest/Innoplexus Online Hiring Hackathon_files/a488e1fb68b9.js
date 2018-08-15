;function getCookie(name){var cookieValue=null;if(document.cookie&&document.cookie!==''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)===(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}
function setupFooter(){$('.footer-links-holder .links-show').click(function(){$(this).parent().toggleClass('active');});}
function setupCSRFToken(){var csrftoken=getCookie('csrftoken')
function csrfSafeMethod(method){return(/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));}
$.ajaxSetup({beforeSend:function(xhr,settings){if(!csrfSafeMethod(settings.type)&&!this.crossDomain){xhr.setRequestHeader("X-CSRFToken",csrftoken);}}});}
function replace_utc_with_localtime(){$(".localtime").each(function(){d=new Date($(this).text())
$(this).html(d)})}
$(function(){setupCSRFToken();setupFooter();replace_utc_with_localtime();});