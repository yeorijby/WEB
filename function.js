function csvToJSON(csv_string){

  console.log(csv_string);  
  
  // 1. 문자열을 줄바꿈으로 구분 => 배열에 저장
  const rows = (csv_string||'').split("\r\n");
  
  // 줄바꿈을 \n으로만 구분해야하는 경우, 아래 코드 사용
  //var workList= (data||'').split('.');
  //const rows = (csv_string||'').split("\n");
  // 2. 빈 배열 생성: CSV의 각 행을 담을 JSON 객체임
  const jsonArray = [];

  // 3. 제목 행 추출 후, 콤마로 구분 => 배열에 저장
  const header = rows[0].split(",");

  console.log(rows.length);
  console.log(header.length);

  // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
  for(let i = 1; i < rows.length; i++){

      // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
      let obj = {};

      // 각 내용 행을 콤마로 구분
      let row = rows[i].split(",");

      // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
      for(let j=0; j < header.length; j++){
          obj[header[j]] = row[j];
      }

      // 각 내용 행의 객체를 jsonArray배열에 담기
      jsonArray.push(obj);

      console.log(obj);
  
  }
  
  // 5. 완성된 JSON 객체 배열 반환
  return jsonArray;

  // 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용
  // return JSON.stringify(jsonArray);
}

function CreateContentsTag(
  No,
  PosName,
  img,
  DoRoMyung,
  JiBun,
  HomePage,
  // latitude,
  // longitude,
  members
) {
  var content = `<div class="wrap">
          <div class="info">
              <div class="title">
                  ${PosName} 
                  <div class="close" id="info_close${No}" title="닫기"></div> 
              </div> 
              <div class="body"> 
                  <div class="img">
                      <img src="${img}" width="75" height="70">
                 </div> 
                  <div class="desc"> 
                      <div class="ellipsis">${DoRoMyung}</div> 
                      <div class="jibun ellipsis">${JiBun}</div> 
                      <div><a href="${HomePage}" target="_blank" class="link">홈페이지</a></div> 
                      <div class="mem">${members}</div> 
                  </div> 
              </div> 
          </div>   
      </div>`;
  return content;
}

// // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
// function closeOverlay() {
//   customOverlay.setMap(null);
// }

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
