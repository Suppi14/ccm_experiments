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

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.js',

    config: {

      // "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/template/resources/default.css" ],
      "data": [ "ccm.store" ]

  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onfinish": { "log": true }

    },

    Instance: function () {

      let $;
      const user = 'jdoe2s';

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

      };

      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {
        // render content that is given via Light DOM
        $.setContent( this.element, this.inner );

        /**
         * dataset for rendering
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

          /**
           * submit button
           * @type {Element}
           */
          const submit = this.element.querySelector( 'input[type=submit]' );

          // has submit button?
          if ( submit ) {

            // submit button is disabled until all subcomponents are ready
            // submit.disabled = true;

            // wrap own content with a form tag to support browser validation on input fields
            const form = document.createElement( 'form' );
            this.element.parentNode.replaceChild( form, this.element );
            form.appendChild( this.element );

            // set submit event
            form.onsubmit = async event => {

              // prevent page reload
              event.preventDefault();

              // // has user instance? => login user (if not already logged in)
              // this.user && await this.user.login();

              /**
               * resulting form data
               * @type {Object}
               */
              let results = this.getValue();
              results['user'] = user;

              // logging of 'submit' event
              this.logger && this.logger.log( 'submit', results );

              // perform 'finish' actions and provide result data
              this.onfinish && await $.onFinish( this, results ).catch(
                  error =>  console.log(error)
              );

            };

          }

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

      };

      /**
       * returns resulting form data
       * @returns {Object} resulting form data
       */
      this.getValue = () => {
        /**
         * result data
         * @type {Object}
         */
        let results = $.formData( this.element );  // fetch values from HTML input elements

        // give only deep copies of results to outside
        return $.clone( results );
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();