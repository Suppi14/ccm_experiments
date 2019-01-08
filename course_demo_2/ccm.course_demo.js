/**
 * @overview example ccm component that just renders "Hello, World!"
 * @author Minh Nguyen <minh.nguyen@web.de> 2018-2019
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    name: 'course_demo',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.7.js',

    config: {
      'user': [
          'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js',
          [ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'hbrsinfkaul' ]
      ],

      'css': [
        'ccm.load', {
            url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css', type: 'css',
            attr: { integrity: 'sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS', crossorigin: 'anonymous' }
          }, {
            url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css', type: 'css', context: 'head',
            attr: { integrity: 'sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS', crossorigin: 'anonymous' }
          }, {
            url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', type: 'css',
            attr: { integrity: 'sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN', crossorigin: 'anonymous' }
          }, {
            url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', type: 'css', context: 'head',
            attr: { integrity: 'sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN', crossorigin: 'anonymous' }
          }
      ],

      'js': [ 'ccm.load', [
        {
          url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js', type: 'js', context: 'head',
          attr: { integrity: 'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo', crossorigin: 'anonymous' }
        },
        {
          url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.bundle.min.js', type: 'js', context: 'head',
          attr: { integrity: 'sha384-zDnhMsjVZfS3hiP7oCBRmfjkQC4fzxVxFhBx8Hkz2aZX8gEvA/jsP3eXRCvzTofP', crossorigin: 'anonymous' }
        }
        ]
      ],

      'html': {
        'main': {
          'inner': [
            { 'id': 'header' },
            { 'id': 'article' },
            { 'id': 'feedback' },
            { 'id': 'footer' }
          ]
        },

        'content': {
          'inner': [
            { 'id': 'section' },
            { 'id': 'menu-list' }
          ]
        }
      },

      'navigation': [ 'ccm.load', 'resources/navigation.html' ],

      'data': ['ccm.store', 'resources/datasets.js']
    },

    Instance: function () {

      const self = this;
      let $;

      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // logging of 'ready' event
        $.privatize( self, true );

      };

      this.start = async () => {
        let main = $.html(self.html.main);
        let article = main.querySelector( '#article' );

        setupNavigation();

        article.innerHTML = 'Hello, World!';
        $.setContent( self.element, main );

        function setupNavigation() {
          let header = main.querySelector( '#header' );
          header.innerHTML = self.navigation.getElementById('navigation-bar').outerHTML;

          // setup toggle button
          header.querySelector( ".navbar-toggler" ).addEventListener( 'click', () => {
            header.querySelector( ".navbar-collapse" ).classList.toggle( 'show' );
          } );

          // setup signing in and out
          const username = header.querySelector('#username');
          const sign_out = header.querySelector('#sign-out');
          const sign_in= header.querySelector('#sign-in');

          sign_in.addEventListener( 'click', async () => {
            self.user && await self.user.login().then ( () => {
              username.innerHTML = "<i class=\"fa fa-user\"></i>" + self.user.data().user;
              sign_in.style.display = "none";
              sign_out.style.display = "block";
            } ).catch((exception) => console.log('login: ' + exception.error));
          } );

          sign_out.addEventListener('click', async () => {
            self.user && await self.user.logout().then ( () => {
              username.innerHTML = "";
              sign_in.style.display = "block";
              sign_out.style.display = "none";
            } ).catch((exception) => console.log('logout: ' + exception.error));
          });
        }

      };

    }

  };

  let b='ccm.'+component.name+(component.version?'-'+component.version.join('.'):'')+'.js';if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);'string'===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||['latest'])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement('script');document.head.appendChild(a);component.ccm.integrity&&a.setAttribute('integrity',component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute('crossorigin',component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();