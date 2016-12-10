import { Component, OnInit, ViewChildren} from '@angular/core';
import {FilterByTitlePipe} from '../pipe/filter.pipe';

@Component({
  moduleId: 'module.id',
  templateUrl : `
                <div class="table-responsive">
                    <table class="table">
                        <tr>
                            <th>Author</th>
                            <th>Publish Date</th>
                            <th>Book Title</th>
                            <th><span class="glyphicon glyphicon-search"></span> <input type="text" [(ngModel)]="value" class="search" (keyup)="searchBook(value)"></th>
                        </tr>
                        <tr *ngFor="let book of filteredBooks">
                            <td>{{book.auther}}</td>
                            <td>{{book.publishDate}}</td>
                            <td>{{book.title}}</td>
                            <td>
                                <button type="button" (click)="removeBook(book)" class="btn btn-danger">Delete</button>
                                <button type="button" (click)="editBook(book)" class="btn btn-info">Edit</button>
                            </td>
                        </tr>
                    </table>
                </div>`
  
})
export class BookListComponent implements OnInit {
  private books : any[];
  private filteredBooks : any[];
  constructor() { }

  ngOnInit() {
    var that = this;
    loadJSON('../public/Books.json',
         function(data) { 
           that.books = data;
           that.filteredBooks = that.books;
          },
         function(xhr) { console.error(xhr); }
    );

    function loadJSON(path, success, error)
    {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success){
                        success(JSON.parse(xhr.responseText))
                    }
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }
  }

  removeBook(book){
    let answer = prompt('Are you sure you want to DELETE this book?,Y or N');
    if(answer.toLowerCase() === 'y')this.books = this.books.filter((element)=>{return element != book})
  }
  
  editBook(book){
    let auther = prompt('Auther:');
    if(auther) book.auther = auther;
    
    let date   = prompt('Publish Date:');
    if(this.isValidDate(date))book.publishDate = date;
    
    let title  = prompt('Title:');
    if(title) book.title = title;
    
  }

  isValidDate(value){
    if (value.match(/^(?:(0[1-9]|1[012])[\. \/.](0[1-9]|[12][0-9]|3[01])[\. \/.](19|20)[0-9]{2})$/))return true;
    else return false;
  }

  searchBook(value){
      this.filteredBooks = this.books.filter((element)=>{
          return element.title.toLowerCase().includes(value.toLowerCase());
      })
  }

}
