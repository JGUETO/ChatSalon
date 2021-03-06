
    socket.on('newMessageGrupalRe', function (data, value, color, positions) {
        console.log("esta llegando")
        console.log(positions)
        var htmlMessage = `<div class="col s12 mensajeUserPg2">
                            <table>
                                <tr>
                                    <td rowspan="2" style="width: 65px;">
                                        <img class="circle" width="50" src="Chat/img/${data.avatar}">
                                    </td>
                                    <td style="padding:0px">
                                        <b>${data.nombre}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0px">
                                        <span>${value}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>`;
        positions.forEach(function (element) {
            htmlGroupPrivado[element.fila][element.columna] += htmlMessage;
        })
        //htmlGroupPrivado[data.fila-1][data.columna-1] += htmlMessage;
        $('.cardChatPg2').html(htmlGroupPrivado[positions[0].fila][positions[0].columna])


        /*if(data.nombre != datatoSend.nombre){
            if(!modalOpen){
                refreshInterval = setInterval(function(){
                    document.getElementById("tablem").rows[fila].cells[columna].classList.toggle('transitionBorder');
                },1000)
            }
            
        }*/
        // Dejar scroll abajo
        //$('#BandejaPg2').scrollTop($('#BandejaPg2')[0].scrollHeight - $('#BandejaPgW 2')[0].clientHeight);
        var element = document.getElementById("BandejaPg2");
        element.scrollTop = element.scrollHeight;
    })


    socket.on('newMessageVideoGrupalRe', function (data, src, color, positions) {
        console.log(positions)
        console.log("entro aqui vale")
        var htmlMessageI = `<div class="col s12 mensajeUser">
                    <table>
                        <tr>
                            <td style="text-align: right;">
                                <b>${data.nombre}</b>
                            </td>
                            <td rowspan="2" style="width: 2px;">
                                <img class="circle" width="50" src="Chat/img/${data.avatar}">
                            </td>
                        </tr>
                        <tr> 
                            <td style="text-align: right;">
                                <span>
                                <video width="270" height="200" controls="" style="margin-left: 10px;width: 260px;">    
                                    <source src="Chat/../uploads/${src}" type="video/mp4">
                                </video>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>`

        positions.forEach(function (element) {
            htmlGroupPrivado[element.fila][element.columna] += htmlMessageI;
        })
        $('.cardChatPg2').html(htmlGroupPrivado[positions[0].fila][positions[0].columna])

        /*if(data.nombre != datatoSend.nombre){
            if(!modalOpen){
                refreshInterval = setInterval(function(){
                    document.getElementById("tablem").rows[fila].cells[columna].classList.toggle('transitionBorder');
                },1000)
            }
            
        }*/

        // Dejar scroll abajo
        //$('#BandejaPg2').scrollTop($('#BandejaPg2')[0].scrollHeight - $('#BandejaPg2')[0].clientHeight);
        var element = document.getElementById("BandejaPg2");
        element.scrollTop = element.scrollHeight;
    })


    socket.on('newMessageImageGrupalRe', function (data, src, color, positions) {
        var htmlMessageI = `<div class="col s12 mensajeUser">
                                <table>
                                    <tr>
                                        <td style="text-align: right;">
                                            <b>${data.nombre}</b>
                                        </td>
                                        <td rowspan="2" style="width: 2px;">
                                            <img class="circle" width="50" src="Chat/img/${data.avatar}">
                                        </td>
                                    </tr>
                                    <tr> 
                                        <td style="text-align: right;">
                                            <span><img class="materialboxed" width="75%" src="Chat/../uploads/${src}"/></span>
                                        </td>
                                    </tr>
                                </table>
                            </div>`
        positions.forEach(function (element) {
            htmlGroupPrivado[element.fila][element.columna] += htmlMessageI;
        })
        $('.cardChatPg2').html(htmlGroupPrivado[positions[0].fila][positions[0].columna])
        $('.materialboxed').materialbox();


        /*if(data.nombre != datatoSend.nombre){
            if(!modalOpen){
                refreshInterval = setInterval(function(){
                    document.getElementById("tablem").rows[fila].cells[columna].classList.toggle('transitionBorder');
                },1000)
            }
            
        }*/

        // Dejar scroll abajo
        //$('#BandejaPg2').scrollTop($('#BandejaPg2')[0].scrollHeight - $('#BandejaPg2')[0].clientHeight);
        var element = document.getElementById("BandejaPg2");
        element.scrollTop = element.scrollHeight;
    })


    // ----- EMIT ------------------------------------------------
    function isEmpty(str) {
        return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
    }

    // Codigo de albeiro 
    $("#mensajePg2").keypress(function (event) {
        if (event.which == 13) {
            var myInput = document.getElementById("mensajePg2");
            if (!isEmpty(myInput.value)) {
                socket.emit('newMessageGrupal', datatoSend, myInput.value, $('#modalPg2').data('colorModal'))
            }
            $('#mensajePg2').val('');
        }
    });


    // Imagenes y videos
    $("#file-inputpg2").change(function () {
        $('#formSubirImagenPg2').submit();
    });

    $('#formSubirImagenPg2').submit(function () {
        var options = {
            success: function (data, textStatus, xhr) {
                console.log(data.resp)
                if (data.resp != 'invalidFile') {
                    if (data.resp == 'image') {
                        socket.emit('newMessageImageGrupal', datatoSend, $('#modalPg2').data('colorModal'))
                        Materialize.toast('Imagen enviado', 4000)
                    }
                    if (data.resp == 'video') {
                        socket.emit('newMessageVideoGrupal', datatoSend, $('#modalPg2').data('colorModal'))
                        Materialize.toast('Video enviado', 4000)
                    }

                } else {
                    Materialize.toast('Extension de archivo invalida', 4000)
                }
            }
        };
        $(this).ajaxSubmit(options);
        //Very important line, it disable the page refresh.
        return false;
    });

