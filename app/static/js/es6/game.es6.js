/*jshint unused: false */
(function(){
  'use strict';

  $(document).ready(init);

  function init() {
  $('#login').click(login);
  $('#dashboard').on('click', '#plant', plant);
  $('#dashboard').on('click', '#getforest', forest);
  $('#forest').on('click', '.grow', grow);
  $('#forest').on('click', '.chop', chop);
  }

  function chop(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    var userId = $('#user').attr('data-id');
    ajax(`/trees/${treeId}/${userId}`, 'PUT', null, h=>{
      tree.replaceWith(h);
      // ajax(`/update/${userId}/wood`, 'PUT', null z=>{
      //   userId.
      // });

    });
  }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'PUT', null, h=>{
      tree.replaceWith(h);

    });
  }

  function forest(){
    var userId = $('#user').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'GET', null, h=> {
      $('#forest').empty().append(h);
    });
  }

  function plant() {
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'POST', {userId:userId}, h =>{
      $('#forest').append(h);
    }); //urls should always be plural in this case..trees
  }


  function login(){
    var username = $('#username').val();


    ajax('/login', 'POST', {username:username}, h =>{
      $('#dashboard').empty().append(h);

    });
  }


  function ajax(url, type,  data={}, success=r=>console.log(r), dataType='html'){  //defualted values in this case dataType go at the end

    $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});  //type is the verb GET POST etc.
  }


})();
