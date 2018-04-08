
export
namespace AsyncRemote {

    export
    interface IMethod<T, U> {

        id: string;

        _argType?: T;

        _retType?: U;
    }

    export
    interface IEvent<U> {

        id: string;

        _dataType?: U;
    }
}
