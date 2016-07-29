talentScreen.factory('tsSubject', function ($resource) {
    return $resource(apiURL+'/api/v1/subjects/:id', {}, {
        query: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        show: {method: 'GET', isArray: true},
        update: {method: 'PUT', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
    });
}).factory('tsSubjects', function ($resource) {
    return $resource(apiURL+'/api/v1/subjects', {}, {
        query: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        show: {method: 'GET', isArray: true},
        update: {method: 'PUT', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
    });
}).factory('tsCategory', function ($resource) {
    return $resource(apiURL+'/api/v1/talentscreen/category', {}, {
        query: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        show: {method: 'GET', isArray: true},
        update: {method: 'PUT', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
    });
}).factory('tsQuizCount', function ($resource) {
    return $resource(apiURL + '/api/v1/talentscreen/subjectquizcount', {}, {
        query: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        show: {method: 'GET', isArray: true},
        update: {method: 'PUT', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
    });
}).factory('challenge', function ($resource) {
        return $resource(apiURL+'/api/v1/talentscreen/subjectquizcount', {}, {
            query: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
});