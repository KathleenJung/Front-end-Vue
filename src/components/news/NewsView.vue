<template>
    <b-container class="mt-5 mb-5">
        <div>
            <div class="titles" data-aos="fade-down">부동산 뉴스</div>
            <b-card-group deck>
                <a :href="news[0].url" target="_blank" class="newslink" data-aos="fade-right">
                    <b-card img-src="https://placekitten.com/1000/300" img-alt="Image" img-top tag="article"
                        img-height="200" class="mb-3 text-left news">
                        <b-card-title>{{ news[0].title }}</b-card-title>
                        <b-card-sub-title class="mb-2">{{ news[0].categoryName }}</b-card-sub-title>
                    </b-card>
                </a>
                <a :href="news[1].url" target="_blank" class="newslink" data-aos="fade-right">
                    <b-card img-src="https://placekitten.com/380/200" img-alt="Image" img-top tag="article"
                        img-height="200" style="height:50px" class="mb-3 text-left news">
                        <b-card-title>{{ news[1].title }}</b-card-title>
                        <b-card-sub-title class="mb-2">{{ news[1].categoryName }}</b-card-sub-title>
                    </b-card>
                </a>
                <a :href="news[2].url" target="_blank" class="newslink" data-aos="fade-left">
                    <b-card img-src="https://placekitten.com/500/350" img-alt="Image" img-top tag="article"
                        img-height="200" class="mb-3 text-left news">
                        <b-card-title>{{ news[2].title }}</b-card-title>
                        <b-card-sub-title class="mb-2">{{ news[2].categoryName }}</b-card-sub-title>
                    </b-card>
                </a>
                <a :href="news[2].url" target="_blank" class="newslink" data-aos="fade-left">
                    <b-card img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top tag="article"
                        img-height="200" class="mb-3 text-left news">
                        <b-card-title>{{ news[3].title }}</b-card-title>
                        <b-card-sub-title class="mb-2">{{ news[3].categoryName }}</b-card-sub-title>
                    </b-card>
                </a>
            </b-card-group>
        </div>

    </b-container>
</template>

<script>
import http from "@/api/http";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
export default {
    name: "newsView",
    data() {
        return {
            news: [],
        };
    },
    created() {
        http.get(`/news`).then(({ data }) => {
            this.news = data;
        });
    },
}
</script>

<style>
.news {
    font-family: "NanumSquare";
    text-decoration: none;
}

.titles {
    color: darkslateblue;
    font-size: xx-large;
    font-family: "NanumSquareExtraBold";
    text-align: left;
    margin-bottom: 20px;
}

.newslink {
    max-width: 50%;
    text-decoration: none;
    color: inherit;
}
</style>