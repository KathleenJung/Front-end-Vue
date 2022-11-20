<template>
    <div>
        <!-- <div style="padding-top:200px;"></div> -->
        <b-button v-b-toggle.sidebar-1 style="position: absolute; left:0; z-index: 2;">
            ▶</b-button>
        <b-sidebar id="sidebar-1" title="Sidebar" shadow>
            <div>
                <b>동 별 검색</b>
                <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                    <b-form-select id="input-3" v-model="form.food" :options="foods1" required></b-form-select>
                </b-form-group>
                <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                    <b-form-select id="input-3" v-model="form.food" :options="foods2" required></b-form-select>
                </b-form-group>
                <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                    <b-form-select id="input-3" v-model="form.food" :options="foods3" required></b-form-select>
                </b-form-group>
                <b-button variant="outline-primary">검색</b-button>
            </div>
            <div class="m-5">
                <b>상세 조건</b>
                <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.name" placeholder="아파트명" required></b-form-input>
                    <b-form-input id="range" type="range"></b-form-input>
                </b-form-group>

            </div>
        </b-sidebar>
        <div id="map" style="position: absolute; z-index: 1;"></div>
    </div>
</template>

<script>
export default {
    name: "KakaoMap",
    data() {
        return {
            map: null,
            form: {
                email: '',
                name: '',
                food: null,
                checked: []
            },
            foods1: [{ text: '시', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
            foods2: [{ text: '군', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
            foods3: [{ text: '구', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
            show: true

        }
    },
    mounted() {
        if (!window.kakao || !window.kakao.maps) {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
            /* global kakao */
            script.addEventListener("load", () => {
                kakao.maps.load(this.initMap);
            });
            document.head.appendChild(script);
        } else {
            this.initMap();
        }
    },
    methods: {
        initMap() {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 5,
            };

            //지도 객체를 등록합니다.
            //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
            this.map = new kakao.maps.Map(container, options);

            // 지도에 확대 축소 컨트롤을 생성한다
            var zoomControl = new kakao.maps.ZoomControl();

            // 지도의 우측에 확대 축소 컨트롤을 추가한다
            this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        },
        openLeft() {

        }
    },
}
</script>

<style scoped>
#map {
    width: 100%;
    height: 700px;
}
</style>