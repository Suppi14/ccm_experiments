/**
 * @overview ccm component for ccm_quiz demo
 * @author Minh Nguyen <minh.nguyen@smail.inf.h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (19.09.2018)
 */

( function () {

  const component = {

    name: 'course_demo',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.6.js',

    config: {
      "html": {
        "main": {
          "inner": [
            { "id": "header" },
            { "id": "article" },
            { "id": "feedback" },
            { "id": "footer" }
          ]
        },
        "content": {
          "inner": [
            { "id": "section" },
            { "id": "menu-list" }
          ]
        }
      },

      "css": [
        "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "resources/default.css"
      ],

      "js": [ "ccm.load",
        [ "https://ccmjs.github.io/tkless-components/libs/jquery/jquery.min.js",
          "https://ccmjs.github.io/tkless-components/libs/bootstrap/js/bootstrap.min.js" ]
      ],

      "navigation": [ "ccm.load", "resources/navigation.html" ],

      "menu": {
        "comp": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.0.js", {
          "css": [ "ccm.load",
            { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
            "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
            "resources/menu.css"
          ],
          "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", {
            "events": {
              "click": {
                "data": true,
                "user": true
              }
            },
            "onfinish": {
              "store": {
                "settings": { "store": "be2_ws1819_menu_log", "url": "http://localhost:3000" },
                "permissions": {
                  "creator": "akless2m",
                  "realm": "hbrsinfkaul",
                  "access": {
                    "get": "all",
                    "set": "creator",
                    "del": "creator"
                  }
                }
              }
            }
          } ]
        } ],
        "data": ["ccm.store", "resources/datasets.js"]
      }

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onfinish": { "log": true }

    },

    Instance: function () {

      const self = this;
      let $;
      let my;

      this.init = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

      };

      this.ready = async () => {

        // privatize all possible instance members
        my = $.privatize( self );
        // logging of 'ready' event
        self.logger && self.logger.log( 'ready', $.clone( my ) );

      };

      this.start = async () => {
        // logging of 'start' event
        self.logger && self.logger.log( 'start', $.clone( my ) );

        let main = $.html( my.html.main );
        const dataset = await my.menu.data.get();

        setupNavigation();

        renderContent();

        $.setContent( self.element, main );

        function setupNavigation() {
          let header = main.querySelector( "#header" );
          header.innerHTML = my.navigation.firstChild.innerHTML;

          // setup common navigation bar behaviors
          [ ...main.querySelectorAll( '.navbar-nav  > li' ) ].map( li => {
            li.addEventListener( 'click', () => {
              [ ...main.querySelectorAll( '.navbar-nav  > li' ) ].map( li => {
                li.classList.re2move( 'active' );
              } );
              li.classList.add( 'active' );
            } );
          } );

          main.querySelector( ".navbar-toggle" ).addEventListener( 'click', () => {
            main.querySelector( ".navbar-toggle" ).classList.toggle( 'collapsed' );
            main.querySelector( ".navbar-collapse" ).classList.toggle( 'in' );
          } );

          // setup home button
          main.querySelector( "#home" ).addEventListener( 'click', () => {
            main.querySelector( ".navbar-toggle" ).click();
            renderContent();
          } );

          // setup help button
          main.querySelector( "#help" ).addEventListener( 'click', () => {
            $.setContent( main.querySelector( "#article" ), $.html(
              '<div class="container">' +
              '  <div class="page-header">' +
              '    <h3>About this app <small>Infos and how to</small></h3>' +
              '  </div><br>'+
              '<div id="accordion"></div>'+
              '</div>'
              // TODO(minhnh) add accordion app
            ) );
          } );

          // TODO(minhnh) sign-on button
        }

        function renderContent() {
          const article = main.querySelector( "#article" );
          $.setContent( article, '' );
          dataset.forEach( result => {
            let content = $.html(my.html.content);
            $.append(article, content);

            $.setContent( content.querySelector( "#section" ), result.section);

            my.menu.comp.start( {
              root: content.querySelector( "#menu-list" ),
              data: result,
              onclick: ( event ) => {
                const div = getDiv();
                div.appendChild( event.content );
                $.setContent( main.querySelector( "#article" ), div );
              }
            } );
          } );
        }

        function getDiv() {
          const div = document.createElement( 'div' );
          div.setAttribute( 'id', 'padding' );
          return div;
        }
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}

} )();