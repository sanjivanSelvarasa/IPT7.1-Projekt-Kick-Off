use master;
go

if db_id('CreateYourselfDB') is null
begin
	create database CreateYourselfDB;
end
go

use CreateYourselfDB;
go

if object_id('dbo.Template', 'U') is null
begin
	create table Template(
	id int primary key identity,
	[name] nvarchar(50),
	[desc] nvarchar(max),
	layout_type nvarchar(50),
	color_theme nvarchar(50),
	created_at datetime2,

	unique([name])
	);
end
go

if object_id('dbo.User', 'U') is null
begin
	create table [User](
	id int primary key identity,
	username nvarchar(50),
	email nvarchar(100),
	password_hash nvarchar(255),
	first_name nvarchar(50),
	last_name nvarchar(50),
	profile_img nvarchar(255),
	bio nvarchar(max),
	created_at datetime2,
	updated_at datetime2,

	constraint UQ_User_Username unique(username),
	constraint UQ_User_Email unique(email)
	);
end
go

if object_id('dbo.Portfolio', 'U') is null
begin
	create table Portfolio(
	id int primary key identity,
	[user_id] int,
	template_id int,
	title nvarchar(100),
	[desc] nvarchar(max),
	slug nvarchar(100),
	visibility nvarchar(20),
	created_at datetime2,
	updated_at datetime2,

	unique(slug),

	foreign key ([user_id]) references [User](id),
	foreign key (template_id) references Template(id)
	);
end
go

if object_id('dbo.Project', 'U') is null
begin
	create table Project(
	id int primary key identity,
	portfolio_id int,
	title nvarchar(100),
	[desc] nvarchar(max),
	img_url nvarchar(255),
	project_url nvarchar(255),
	github_url nvarchar(255),
	[start_date] date,
	end_date date,
	created_at datetime2,
	updated_at datetime2,

	foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.Skill', 'U') is null
begin
	create table Skill(
	id int primary key identity,
	[name] nvarchar(50),
	[desc] nvarchar(max),
	created_at datetime2,

	unique([name])
	);
end
go

if object_id('dbo.PortfolioSkill', 'U') is null
begin
	create table PortfolioSkill(
	id int primary key identity,
	portfolio_id int,
	skill_id int,
	[level] tinyint,
	created_at datetime2,

	foreign key (portfolio_id) references Portfolio(id),
	foreign key (skill_id) references Skill(id)
	);
end
go

if object_id('dbo.SocialLink', 'U') is null
begin
	create table SocialLink(
	id int primary key identity,
	portfolio_id int,
	[platform] nvarchar(50),
	[url] nvarchar(255),
	created_at datetime2,

	foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.Experience', 'U') is null
begin
	create table Experience(
	id int primary key identity,
	portfolio_id int,
	company_name nvarchar(100),
	position nvarchar(100),
	[desc] nvarchar(max),
	[start_date] date,
	end_date date,
	created_at datetime2,

	foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.Education', 'U') is null
begin
	create table Education(
	id int primary key identity,
	portfolio_id int,
	institution_name nvarchar(100),
	degree nvarchar(100),
	field_of_study nvarchar(100),
	[start_date] date,
	end_date date,
	created_at datetime2,

	foreign key (portfolio_id) references Portfolio(id)
	);
end
go

if object_id('dbo.UserRefreshToken', 'U') is null
begin
	create table UserRefreshToken(
	id int primary key identity,
	[user_id] int,
	token nvarchar(2048),
	created_at datetime2,

	unique(token),

	foreign key ([user_id]) references [User](id)
	);
end
go