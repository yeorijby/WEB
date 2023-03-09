let gApi_key;
let gUrl;
function CreateContentsTag(
  No,
  PosName,
  img,
  DoRoMyung,
  JiBun,
  HomePage,
  members
) {
  var content = `<div class="wrap">
          <div class="info">
              <div class="title">
                  ${PosName} 
                  <div class="close" id="info_close_${No}" title="닫기"></div> 
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

  // var content = `<div class="wrap">
  //     <div class="info">
  //         <div class="title">
  //             ${PosName} 
  //             <div class="close" id="info_close_${No}" title="닫기"></div> 
  //         </div> 
  //         <div class="body"> 
  //             <div class="img">
  //                 <img src="${img}" width="75" height="70">
  //            </div> 
  //             <div class="desc"> 
  //                 <div class="ellipsis">${DoRoMyung}</div> 
  //                 <div class="jibun ellipsis">${JiBun}</div> 
  //                 <div><a href="${HomePage}" target="_blank" class="link">홈페이지</a></div> 
  //                 <div class="mem">${members}</div> 
  //             </div> 
  //         </div> 
  //     </div>   
  // </div>`;

  return content;
}

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
function closeOverlay() {
  customOverlay.setMap(null);
}
// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
  console.log("markers.length:",markers.length, "map : ", map);
  for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
  }            
}

function fetchSchool(schooltype)
{
  //================================================================================================
  // div 동적 제거
  //================================================================================================
  // const div = document.querySelector('.wrap'); // 제거할 div 요소 선택
  // // div 내부의 모든 자식 요소를 제거
  // while (div.firstChild) {
  //   div.removeChild(div.firstChild);
  // }
  //------------------------------------------------------------------------------------------------

  //================================================================================================
  // 마커 동적 제거
  //================================================================================================
  setMarkers(null);
  //------------------------------------------------------------------------------------------------


  // // 위에서 작성한 코드를 사용하여 데이터 처리
  // var api_key = "3c3198ef4877402c9361a69a6c47398b";
  // var url = 'https://openapi.gg.go.kr/MskulM'; /*URL*/
  var queryParams = '?' + encodeURIComponent('Key') + '='+gApi_key; /*Service Key*/
  queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /**/
  queryParams += '&' + encodeURIComponent('pIndex') + '=' + encodeURIComponent(1); /**/
  queryParams += '&' + encodeURIComponent('pSize') + '=' + encodeURIComponent(1000); /**/   
  
  fetch(gUrl + queryParams)
    .then(response => response.json())
    .then(data => {
      if (schooltype === "Middle")
      {
        arrAllSchoolData = data.MskulM[1].row;
      }
      else
      {
        arrAllSchoolData = data.HgschlM[1].row;
      }
      processData();
    })
  // fetch('./addr.json')
  //   .then(response => response.json())
  //   .then(data => {
  //     arrANC_Data = data;
  //     processData();
  //   })

  //console.log(arrFetch);
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

function setSchoolInfo(schooltype) {
  var middleSchoolControl = document.getElementById("btnMiddleSchool");
  var highSchoolControl = document.getElementById("btnHighSchool");
  if (schooltype === "Middle") {
    //map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    middleSchoolControl.className = "selected_btn";
    highSchoolControl.className = "btn";

    // 중학교 정보를 입력하면 됨 
    gApi_key = "3c3198ef4877402c9361a69a6c47398b";
    gUrl = 'https://openapi.gg.go.kr/MskulM'; /*URL*/
  } else {
    //map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    highSchoolControl.className = "selected_btn";
    middleSchoolControl.className = "btn";

    // 고등학교 정보를 입력하면 됨 
    gApi_key = "700da445e66f4c24b6e89057d2df33dd";
    gUrl = 'https://openapi.gg.go.kr/HgschlM'; /*URL*/
  }

  fetchSchool(schooltype);
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
  map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
  map.setLevel(map.getLevel() + 1);
}

// 다시 만들어내기 - 사용안함
function AddMarkerNCustomOverlay(map, nIndex, latitude, longitude){

  // 커스텀 오버레이가 표시될 위치입니다
  var position = new kakao.maps.LatLng(latitude, longitude);

  // 지도에 마커를 표시합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: position, //new kakao.maps.LatLng(latitude, longitude),
  });

  markers.push(marker);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    content: contents,
    map: map,
    position: position, //marker.getPosition()
  });

  // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
  kakao.maps.event.addListener(marker, "click", function () {
    customOverlay.setMap(map);
  });

  // 기본적으로 닫아놓고 마커만 표시해놓는다. 
  customOverlay.setMap(null);
        
  AddClickEventListener(nIndex, customOverlay);
}
// 다시 만들어내기
function AddClickEventListener(nIndex, customOverlay){
  var strGetElementById = "info_close_" + nIndex;

  document.getElementById(strGetElementById).addEventListener("click", function (event) {
    customOverlay.setMap(null);
  });
}