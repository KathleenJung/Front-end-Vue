<template>
    <b-container class="mt-5 mb-5">
        <div>
            <div class="titles">부동산 뉴스</div>
            <b-card-group deck>
                <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006975425" target="_blank" class="newslink"
                    data-aos="fade-right">
                    <b-card title="뉴스 제목" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
                        tag="article" class="mb-3 text-left news">
                        <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006975425"></a>
                        <b-card-sub-title class="mb-2">카테고리</b-card-sub-title>
                    </b-card>
                </a>
                <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006972580" target="_blank" class="newslink"
                    data-aos="fade-right">
                    <b-card title="뉴스 제목" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
                        tag="article" class="mb-3 text-left news">
                        <b-card-sub-title class="mb-2">카테고리</b-card-sub-title>
                    </b-card>
                </a>
                <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006972580" target="_blank" class="newslink"
                    data-aos="fade-right">
                    <b-card title="뉴스 제목" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
                        tag="article" class="mb-3 text-left news">
                        <b-card-sub-title class="mb-2">카테고리</b-card-sub-title>
                    </b-card>
                </a>
                <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006972580" target="_blank" class="newslink"
                    data-aos="fade-right">
                    <b-card title="뉴스 제목" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
                        tag="article" class="mb-3 text-left news">
                        <b-card-sub-title class="mb-2">카테고리</b-card-sub-title>
                    </b-card>
                </a>
            </b-card-group>
            <b-card-group deck>
                <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006975425" target="_blank" class="newslink"
                    data-aos="fade-left">
                    <b-card title="뉴스 제목" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
                        tag="article" class="mb-3 text-left news">
                        <b-card-sub-title class="mb-2">카테고리</b-card-sub-title>
                    </b-card>
                </a>
                <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006975425" target="_blank" class="newslink"
                    data-aos="fade-left">
                    <b-card title="뉴스 제목" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
                        tag="article" class="mb-3 text-left news">
                        <b-card-sub-title class="mb-2">카테고리</b-card-sub-title>
                    </b-card>
                </a>
                <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006975425" target="_blank" class="newslink"
                    data-aos="fade-left">
                    <b-card title="뉴스 제목" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
                        tag="article" class="mb-3 text-left news">
                        <b-card-sub-title class="mb-2">카테고리</b-card-sub-title>
                    </b-card>
                </a>
                <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006975425" target="_blank" class="newslink"
                    data-aos="fade-left">
                    <b-card title="뉴스 제목" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
                        tag="article" class="mb-3 text-left news">
                        <b-card-sub-title class="mb-2">카테고리</b-card-sub-title>
                    </b-card>
                </a>
            </b-card-group>
        </div>

    </b-container>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
export default {

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
    max-width: 25%;
    text-decoration: none;
}
</style>