$(document).ready(function () {
    show_orders();
});

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
                                        <button value="수거중" onclick="update_status(this,${order_id});"  class="button_content">
                                            수거중
                                        </button>
                                    </div>
                                    <div class="button_body">
                                    <button value="수거 완료" onclick="update_status(this,${order_id});"  class="button_content">
                                        수거 완료
                                    </button>
                                    </div>
                                    <div class="button_body">
                                    <button value="배송중" onclick="update_status(this,${order_id});"  class="button_content">
                                        배송중
                                    </button>
                                    </div>
                                    <div class="button_body">
                                    <button value="배송 완료" onclick="update_status(this,${order_id});"  class="button_content">
                                        배송 완료
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

// 상태 수정
function update_status(status,order_id) {
    const value = $(status).val();
    console.log(value);
    console.log(order_id)

    $.ajax({
        type: "PATCH",
        url: `/api/owners/step/${order_id}`,
        data: {
            "value_give": value,
        },
        dataType: "json",
        success: function (response) {
            window.location.reload();
        },
    });
};
// $(document).ready(function () {
//     show_status();
// });

// function modal_open() { 
//     $(".modal").fadeIn();

//     $(document).mouseup(function (e) {
//         if($(".modal").has(e.target).length === 0) {
//             $(".modal").hide();
//         };
//     });
// };

// function status_err() {
//    $(".err_modal").fadeIn();

//    $(document).mouseup(function (e) {
//         if($(".err_modal").has(e.target).length === 0) {
//             $(".err_modal").hide();
//         };
//    });
// };

// // 상태 조회
// function show_status() {
//     $.ajax({
//         type: "GET",
//         url: "/api/orders",
//         data: {},
//         success: function (response) {
//             let rows = response["status"];

//             for (let i = 0; i < rows.length; i++) {
//                 let step = rows[i]['status'];

//                 let temp_html = `
//                                 <div onclick="modal_open()" class="order-content">
//                                     <div class="content-left">
//                                         <div class="order-name">
//                                             변정민
//                                         </div>
//                                         <div class="order-address">
//                                             대한민국 어디시 어디도 어디군 어디로 어디읍 어디어디어디 
//                                         </div>
//                                         <div class="order-date">
//                                             2022-12-30
//                                         </div>
//                                     </div>
//                                     <div class="content-right">
//                                         ${step}
//                                     </div>
//                                 </div>
//                                 `;
//                 $("#body_bottom").append(temp_html);
//             };
//         },
//     });
// };

// // 상태 등록
// function create_status(status) {
//     const value = $(status).val();
//     console.log(value);

//     $.ajax({
//         type: "POST",
//         url: "/api/step",
//         data: {
//             "value_give": value
//         },
//         dataType: "json",
//         success: function (response) {
//             window.location.reload();
//         },
//     });
// };
