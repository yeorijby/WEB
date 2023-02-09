// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
function closeOverlay() {
  overlay.setMap(null);
}

function CustomOverlayAbleClose(
  PosName,
  img,
  DoRoMyung,
  JiBun,
  HomePage,
  latitude,
  longitude
) {
  // 커스텀 오버레이에 표시할 내용입니다
  // HTML 문자열 또는 Dom Element 입니다
  // var content = '<div class="wrap">' +
  //     '    <div class="info">' +
  //     '        <div class="title">' +
  //     '            카카오 스페이스닷원' +
  //     '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
  //     '        </div>' +
  //     '        <div class="body">' +
  //     '            <div class="img">' +
  //     '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
  //     '           </div>' +
  //     '            <div class="desc">' +
  //     '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
  //     '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
  //     '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
  //     '            </div>' +
  //     '        </div>' +
  //     '    </div>' +
  //     '</div>';

  var content = `<div class="wrap"> + 
                <div class="info"> + 
                    <div class="title"> + 
                        ${PosName} + 
                        <div class="close" onclick="closeOverlay()" title="닫기"></div> + 
                    </div> + 
                    <div class="body"> + 
                        <div class="img"> +
                            <img src="${img}" width="73" height="70"> +
                       </div> + 
                        <div class="desc"> + 
                            <div class="ellipsis">${DoRoMyung}</div> + 
                            <div class="jibun ellipsis">${JiBun}</div> + 
                            <div><a href="${HomePage}" target="_blank" class="link">홈페이지</a></div> + 
                        </div> + 
                    </div> + 
                </div> +    
            </div>`;
  // 커스텀 오버레이가 표시될 위치입니다
  // var position = new kakao.maps.LatLng(33.450701, 126.570667);
  var position = new kakao.maps.LatLng(latitude, longitude);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition(),
  });

  customOverlay.setMap(map);
}

function CustomOverlay(contents, latitude, longitude) {
  // 커스텀 오버레이에 표시할 내용입니다
  // HTML 문자열 또는 Dom Element 입니다
  // var content = '<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>';
  var content = `<div class ="label"><span class="left"></span><span class="center">${contents}!</span><span class="right"></span></div>`;

  // 커스텀 오버레이가 표시될 위치입니다
  // var position = new kakao.maps.LatLng(33.450701, 126.570667);
  var position = new kakao.maps.LatLng(latitude, longitude);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });

  customOverlay.setMap(map);
}

function CustomOverlay(contents, latitude, longitude) {
  // 커스텀 오버레이에 표시할 내용입니다
  // HTML 문자열 또는 Dom Element 입니다
  // var content = '<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>';
  var content = `<div class ="label"><span class="left"></span><span class="center">${contents}!</span><span class="right"></span></div>`;

  // 커스텀 오버레이가 표시될 위치입니다
  // var position = new kakao.maps.LatLng(33.450701, 126.570667);
  var position = new kakao.maps.LatLng(latitude, longitude);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });

  customOverlay.setMap(map);
}

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType(maptype) {
  var roadmapControl = document.getElementById("btnRoadmap");
  var skyviewControl = document.getElementById("btnSkyview");
  if (maptype === "roadmap") {
    map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    roadmapControl.className = "selected_btn";
    skyviewControl.className = "btn";
  } else {
    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    skyviewControl.className = "selected_btn";
    roadmapControl.className = "btn";
  }
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
  map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
  map.setLevel(map.getLevel() + 1);
}