/**
 * @overview datasets of ccm component for business english app
 * @author Tea Kless <tea.kless@web.de> 2018
 * @license The MIT License (MIT)
 */
ccm.files[ 'datasets.js' ] = {

  "test_menu": {
    "key": "test_menu",
    "section": "Test Menu 1",
    "entries": [
      {
        "title": '<span class="fa fa-pencil-square-o"></span>Test Entry 1',
        "content": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-5.0.0.js", {
          "key": [ "ccm.get", { "store": "w2c_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1526550731302X4453331659613695" ],
          "data": {
            "store": [ "ccm.store", { "store": "be2_ws18_cloze_results", "url": "https://ccm2.inf.h-brs.de", "method": "POST" } ],
            "key": "test_entry_1",
            "user": true
          },
          "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", {
            "events": {
              "start": {
                "data": true,
                "user": true
              },
              "change": {
                "data": true,
                "user": true
              },
              "feedback": {
                "data": true,
                "user": true
              },
              "retry": {
                "data": true,
                "user": true
              },
              "finish": {
                "data": true,
                "user": true
              }
            },
            "onfinish": {
              "store": {
                "settings": { "store": "be2_ws1819_pdf_viewer_log", "url": "http://localhost:3000" },
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
          } ],
          "onfinish": {
            "login": true,
            "store": {
              "settings": {
                "url": "http://localhost:3000",
                "method": "POST",
                "store": "be2_ws18_cloze_results"
              },
              "key": "test_entry_1",
              "user": true,
              "permissions": {
                "creator": "teacher",
                "realm": "guest",
                "group": [ "%user%" ],
                "access": {
                  "get": "group",
                  "set": "group",
                  "del": "creator"
                }
              }
            },
            "alert": "Saved for your student analytics!",
            "restart": true
          }
        } ]
      },
      {
        "title": '<span class="fa fa-pencil-square-o"></span>Test Entry 2',
        "content": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-5.0.0.js", {
          "key": [ "ccm.get", { "store": "w2c_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1518690906548X9893455548879022" ],
          "data": {
            "store": [ "ccm.store", { "store": "be2_ws18_cloze_results", "url": "https://ccm2.inf.h-brs.de", "method": "POST" } ],
            "key": "test_entry_2",
            "user": true
          },
          "onfinish": {
            "login": true,
            "store": {
              "settings": {
                "url": "http://localhost:3000",
                "method": "POST",
                "store": "be2_ws18_cloze_results"
              },
              "key": "test_entry_2",
              "user": true,
              "permissions": {
                "creator": "teacher",
                "realm": "guest",
                "group": [ "%user%" ],
                "access": {
                  "get": "group",
                  "set": "creator",
                  "del": "creator"
                }
              }
            },
            "alert": "Saved for your student analytics!",
            "restart": true
          }
        } ]
      }
    ]
  },

  "test_menu_second": {
    "key": "test_menu_second",
    "section": "Test Menu 2",
    "entries": [
      {
        "title": '<span class="fa fa-pencil-square-o"></span>Test Entry 3',
        "content": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-5.0.0.js", {
          "key": [ "ccm.get", { "store": "w2c_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1518692231862X6906233038090239" ],
          "data": {
            "store": [ "ccm.store", { "store": "be2_ws18_cloze_results", "url": "https://ccm2.inf.h-brs.de", "method": "POST" } ],
            "key": "test_entry_3",
            "user": true
          },
          "onfinish": {
            "login": true,
            "store": {
              "settings": {
                "url": "http://localhost:3000",
                "method": "POST",
                "store": "be2_ws18_cloze_results"
              },
              "key": "test_entry_3",
              "user": true,
              "permissions": {
                "creator": "teacher",
                "realm": "guest",
                "group": [ "%user%" ],
                "access": {
                  "get": "group",
                  "set": "creator",
                  "del": "creator"
                }
              }
            },
            "alert": "Saved for your student analytics!",
            "restart": true
          }
        } ]
      }
    ]
  }

};