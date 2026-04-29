<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;



class AdminController extends Controller
{

    public function login(Request $request)
    {
        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'message' => 'Email ou senha inválidos'
            ], 401);
        }

        return response()->json([
            'message' => 'Login realizado com sucesso',
            'admin' => $admin
        ]);
    }
    
    public function index(){
        return response()->json(Admin::all());
    }   

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Administrador criado com sucesso',
            'admin' => $admin
        ]);
    }   

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id){
        $admin = Admin::findOrFail($id);

        $admin->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Administrador atualizado com sucesso',
            'admin' => $admin
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id){
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json([
            'message' => 'Administrador removido com sucesso'
        ]);
    }
}
