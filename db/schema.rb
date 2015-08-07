# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150807205710) do

  create_table "boards", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.integer  "list_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "image_url"
  end

  add_index "cards", ["list_id"], name: "index_cards_on_list_id"

  create_table "lists", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "board_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "lists", ["board_id"], name: "index_lists_on_board_id"

end
