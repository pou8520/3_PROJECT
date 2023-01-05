$(document).ready(function () {
    show_orders();
});

// 세탁물 등록시 모달
function modal_open1() { 
    $(`.modal`).fadeIn();

    $(document).mouseup(function (e) {
        if($(`.modal`).has(e.target).length === 0) {
            $(`.modal`).hide();
        };
    });
};

// 세탁물 조회 모달
function modal_open(i) { 
    $(`.modal_${i}`).fadeIn();

    $(document).mouseup(function (e) {
        if($(`.modal`).has(e.target).length === 0) {
            $(`.modal`).hide();
        };
    });
};

// 세탁물 조회 
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
                let step = rows[i]['step'];
                let createdAt = rows[i]['createdAt'];
                let order_id = rows[i]['id'];
                let time = createdAt.split(' ');


                
                let temp_html = `
                        <div onclick="modal_open(${i})" class="order-content">
                            <div class="content-left">
                                <div class="order-name">
                                    ${nickname}
                                </div>
                                <div class="order-address">
                                    ${address} 
                                </div>
                                <div class="order-date">
                                    ${time[0]}<br>${time[1]}
                                </div>
                            </div>
                            <div class="content-right">
                                ${step}
                            </div>
                        </div>
                        <div class="modal_${i} modal">
                            <div id="${i}" class="modal_content update_modal">
                                <div class="modal_title">
                                    라쿤표 세탁 신청서
                                </div>
                                <div class="modal_top">
                                    <div class="order_image">
                                        <image src="/${image}" width="300" height="385">
                                    </div>
                                    <div class="order_content">
                                        <div class="content_body">
                                            이름 : ${nickname}
                                        </div>
                                        <div class="content_body">
                                            전화번호 : 456
                                        </div>
                                        <div class="content_body">
                                            주소 : ${address}
                                        </div>
                                        <div class="content_body">
                                            요청 내용 : ${content}
                                        </div>
                                    </div>
                                </div>
                                <div class="modal_button">
                                    <div class="button_body">
                                        <button value="수정" onclick="update_orders_model(${i},${order_id},'${address}','${content}','${nickname}');"  class="button_content">
                                            수정
                                        </button>
                                    </div>
                                    <div class="button_body">
                                        <button value="삭제" onclick="delete_order(${order_id})"  class="button_content">
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                                `
                $('#body_bottom').append(temp_html);                
            };
        },
    });
};

// 세탁물 등록
function create_orders() {
    const name = $("#name").val();
    const address = $("#address").val();
    const request_comment = $("#request_comment").val();
    const image = $('input[name="chooseFile"]').get(0).files[0];
    const formData = new FormData();
    let token = localStorage.getItem('token') || '';
    console.log(token)
    formData.append('nickname', name);
    formData.append('address', address);
    formData.append('content', request_comment);
    formData.append('image', image);

    for (let value of formData.values()) {
        console.log(value);
    }

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        type: "POST",
        url: "/api/orders",
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        data: formData ,
        success: function (response) {
            window.location.reload();
        },
    });
};

// 세탁물 수정
function update_orders(order_id) {
    const name = $("#name").val();
    const address = $("#address").val();
    const request_comment = $("#request_comment").val();
    const image = $('input[name="chooseFile"]').get(0).files[0];
    const formData = new FormData();

    formData.append('nickname', name);
    formData.append('address', address);
    formData.append('content', request_comment);
    formData.append('image', image);

    $.ajax({
        type: "PATCH",
        url: `/api/orders/${order_id}`,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            window.location.reload();
        },
    });

}

// 세탁물 수정 model
function update_orders_model(modal_id, order_id, address, content, nickname) {
    let a = $(`#${modal_id}`)
    a.empty();

    let temp_html = `
                    <div class="modal_title">
                        라쿤표 세탁 신청서
                    </div>
                    <div class="modal_top">
                        <form method="post" enctype="multipart/form-data"></form>
                            <div class="order_image">
                                <div class="image">
                                        <div class="button">
                                            <label for="chooseFile">
                                                이미지 등록
                                            </label>
                                        </div>
                                        <input type="file" id="chooseFile" name="chooseFile" accept="image/*">
                                </div>
                            </div>
                            <div class="order_content">
                                <div class="content_body">
                                    이름 : <input value="${nickname}" id="name" class="input">
                                </div>
                                <div class="content_body">
                                    주소 : <input value="${address}" id="address" class="input">
                                </div>
                                <div class="content_body">
                                    요청 내용 : <input value="${content}" id="request_comment" class="input">
                                </div>
                            </div>
                        </form>
                    </div>    
                    <div class="modal_button">
                        <div class="button_body">
                            <button onclick="update_orders(${order_id})" class="button_content">
                                수정
                            </button>
                        </div>
                    </div>
                    `
    a.append(temp_html)
}

// 세탁물 삭제 
function delete_order(order_id) {
    $.ajax({
        type: "DELETE",
        url: `/api/orders/${order_id}`,
        success: function (response) {
            console.log(response)
            window.location.reload();
        },
    });
};