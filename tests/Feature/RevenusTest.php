<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Revenus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RevenusTest extends TestCase
{
    use RefreshDatabase;

    public function test_revenu_stocked(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $this->actingAs($user)
            ->post('/revenus', [
            'date' => Carbon::today(),
            'montant' => 200000,
            'category_id' => $category->id,
            'description' => "La description de ce revenu",
            'user_id' => $user->id
        ]);

        $this->assertCount(1, Revenus::all());
    }

    public function test_revenu_update(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

       $this->actingAs($user)
            ->post('/revenus', [
            'date' => Carbon::today(),
            'montant' => 200000,
            'category_id' => $category->id,
            'description' => "La description de ce revenu",
            'user_id' => $user->id
        ]);

        $revenu = Revenus::first();

        $this->actingAs($user)
            ->put('/revenus/' . $revenu->id, [
            'date' => Carbon::tomorrow(),
            'montant' => 300000,
            'category_id' => $category->id,
            'description' => "La description de ce revenu",
            'user_id' => $user->id
        ]);

        $this->assertEquals(Carbon::tomorrow(), Revenus::first()->date);
        $this->assertEquals(300000, Revenus::first()->montant);

    }

    public function test_revenu_destroy(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $this->actingAs($user)
            ->post('/revenus', [
            'date' => Carbon::today(),
            'montant' => 200000,
            'category_id' => $category->id,
            'description' => "La description de ce revenu",
            'user_id' => $user->id
        ]);

        $revenu = Revenus::first();

        $this->delete('/revenus/' . $revenu->id);

        $this->assertEquals(0, Revenus::count());
    }
}
