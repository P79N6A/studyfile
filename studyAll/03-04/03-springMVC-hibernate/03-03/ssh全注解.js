一.hibernate相关

class注解：hibernate相关
@Entity：表明当前类是持久化类
@Table(name="team",catalog="NBA"):映射一个表team，所对应的数据库是NBA

字段属性注解：
1.@GenericGenerator(name="generator",strategy="increment")
  @Id
  @GeneratedValue(generator="generator")
  @Column(name="id",unique=true,nullable=false)表明该字段是主键，自增长，不为空而且唯一
2.@Column(name="description",length=500)
3.@OneToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY,mappedBy="")
  级联操作：cascade=CascadeType.All,延迟加载：fetch=FetchType.LAZY，
  映射:mappedBy="category",一对多方式
category
4.@OneToMany(fetch=FetchType.LAZY)
  @JoinColumn(name="category_id")
  延迟加载：多对一方式，关联信息：外键name="category_id"

OneToMany事例代码:见页面

ManyToMany事例代码
@JoinTable

@GeneratedValue(strategy = {
	GenerationType.SEQUENCE, generator="SEQ_STORE" 使用sequence生成主键
	GenerationType.IDENTITY 使用自动生成
})

二，spring相关
@Component
@Repository
@Service
@Controller
他们四个是等效的，一般按照命名分在持久层，业务层，控制层中
@Controller负责注册一个bean到spring上下文中，bean的Id默认为类名称开头字母小写
@Autowired跟据bean类型从spring上下文中进行查找，注册类型必须唯一，否则异常
@Resource允许通过bean名称和类型两种方式查找
@Autowired 不用写get set