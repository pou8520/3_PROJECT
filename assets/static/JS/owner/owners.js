$(document).ready(function () {
    show_status();
});

function modal_open() { 
    $(".modal").fadeIn();

    $(document).mouseup(function (e) {
        if($(".modal").has(e.target).length === 0) {
            $(".modal").hide();
        };
    });
};

function status_err() {
   $(".err_modal").fadeIn();

   $(document).mouseup(function (e) {
        if($(".err_modal").has(e.target).length === 0) {
            $(".err_modal").hide();
        };
   });
};

// 상태 조회
function show_status() {
    $.ajax({
        type: "GET",
        url: "/api/orders",
        data: {},
        success: function (response) {
            let rows = response["status"];

            for (let i = 0; i < rows.length; i++) {
                let step = rows[i]['status'];

                let temp_html = `
                                <div onclick="modal_open()" class="order-content">
                                    <div class="content-left">
                                        <div class="order-name">
                                            변정민
                                        </div>
                                        <div class="order-address">
                                            대한민국 어디시 어디도 어디군 어디로 어디읍 어디어디어디 
                                        </div>
                                        <div class="order-date">
                                            2022-12-30
                                        </div>
                                    </div>
                                    <div class="content-right">
                                        ${step}
                                    </div>
                                </div>
                                `;
                $("#body_bottom").append(temp_html);
            };
        },
    });
};

// 상태 등록
function create_status(status) {
    const value = $(status).val();
    console.log(value);

    $.ajax({
        type: "POST",
        url: "/api/step",
        data: {
            "value_give": value
        },
        dataType: "json",
        success: function (response) {
            window.location.reload();
        },
    });
};

// 상태 수정
function update_status(status) {
    const value = $(status).val();
    console.log(value);

    $.ajax({
        type: "PATCH",
        url: "/api/orders/:order_id/step",
        data: {
            "value_give": value
        },
        dataType: "json",
        success: function (response) {
            if (value === '수거 하기') {
                $(".err_modal1").fadeIn();

                $(document).mouseup(function (e) {
                        if($(".err_modal1").has(e.target).length === 0) {
                            $(".err_modal1").hide();
                            window.location.reload();
                        };
                })
            }else {
                window.location.reload();
            };
        },
    });
};