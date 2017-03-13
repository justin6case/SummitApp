import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

export class FeedItem {
  author: string;
  link: string;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  description: string;
  isVideo: boolean;

  constructor(author: string, link: string, title: string,
              subtitle: string, summary: string, image: string, description: string) {
    this.author = author;
    this.link = link;
    this.title = title;
    this.subtitle = subtitle;
    this.summary = summary;
    this.image = image;
    this.description = description;
    this.isVideo = true;
  }
}

export class Feed {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

@Injectable()
export class VideoService{
  http:any;

  constructor(http:Http){
    this.http = http;
  }

  //getPosts(){
    //return this.http.get(this.baseUrl).map(res => res);
  //}

  public getArticlesForUrl(feedUrl: string) {
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feedUrl)+'%22&format=json';
    let articles = [];
    return this.http.get(url)
    .map(data => data.json()['query']['results'])
    .map((res) => {

      if (res == null) {
        return articles;
      }
      let objects = res['item'];

      for (let i = 0; i < objects.length; i++) {
        let item = objects[i];
        let newFeedItem = new FeedItem(item.author, item.link, item.title,
           item.subtitle, item.summary, item.content.thumbnail.url, item.description);
        articles.push(newFeedItem);
      }
      return articles;
    })
  }
}
