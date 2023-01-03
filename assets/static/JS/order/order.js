$(document).ready(function () {
    show_orders();
});


function modal_open() { 
    $(".modal").fadeIn();

    $(document).mouseup(function (e) {
        if($(".modal").has(e.target).length === 0) {
            $(".modal").hide();
        };
    });
};

function show_orders(){
    $.ajax({
        type: "GET",
        url: "/api/orders",
        data: {},
        success: function (response) {
            let rows = response["orders"];

            for (let i = 0; i < rows.length; i++) {
                let nickname = rows[i]['nickname'];
                let address = rows[i]['address'];
                let content = rows[i]['content'];
                let image = rows[i]['image'];
                let createdAt = rows[i]['createdAt']
                let day = createdAt.split('T')
                let clock = day[1].split('.')
                console.log(day[0])
                console.log(clock[0])

                let temp_html = `
                            <div onclick="modal_open()" class="order-content">
                                <div class="content-left">
                                    <div class="order-name">
                                        ${nickname}
                                    </div>
                                    <div class="order-address">
                                        ${address} 
                                    </div>
                                    <div class="order-date">
                                        ${day[0]}<br>${clock[0]}
                                    </div>
                                </div>
                                <div class="content-right">
                                    대기중
                                </div>
                            </div>
                                `
                $('#body_bottom').append(temp_html);                
            };
        },
    });
};


function create_orders() {
    const name = $("#name").val();
    const address = $("#address").val();
    const request_comment = $("#request_comment").val();
    const image = $('input[name="chooseFile"]').get(0).files[0];
    const formData = new FormData();
    console.log(name,address,request_comment, image)

    formData.append('nickname', name)
    formData.append('address', address)
    formData.append('content', request_comment)
    formData.append('image', image)

    for (let value of formData.values()) {
        console.log(value);
    }

    $.ajax({
        type: "POST",
        url: "/api/orders",
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        data: formData ,
        // success: function (response) {
        //     window.location.reload();
        // },
    });
};