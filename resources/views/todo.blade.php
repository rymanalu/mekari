@extends('app')

@section('content')
<section class="content">
    <div class="row">
        <div class="col-md-6">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Create a new Todo</h3>
                </div>

                <form class="form-horizontal">
                    <div class="box-body">
                        <div class="form-group">
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="task" placeholder="Type in a new Todo...">
                            </div>
                            <div class="col-sm-2">
                                <button type="submit" class="btn btn-primary">
                                    <i class="glyphicon glyphicon-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="col-md-6">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Todo List</h3>
                </div>

                <div class="box-body" id="todo-list"></div>
            </div>
        </div>
    </div>
</section>
@endsection

@push('scripts')
<script src="{{ asset('js/todo.js') }}"></script>
@endpush
